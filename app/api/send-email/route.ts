import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/send-email
 * Gửi email thông báo về Gmail khi có khách xác nhận RSVP.
 *
 * Yêu cầu các biến môi trường trong .env.local:
 *   GMAIL_USER           = địa chỉ Gmail gửi đi
 *   GMAIL_APP_PASSWORD   = Mật khẩu ứng dụng 16 ký tự (App Password)
 *   NOTIFY_EMAILS        = danh sách email nhận, phân cách bằng dấu phẩy
 */
export async function POST(req: Request) {
  try {
    const { name, attendance, guest_count, message } = await req.json();

    // Kiểm tra biến môi trường bắt buộc
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("[send-email] Thiếu GMAIL_USER hoặc GMAIL_APP_PASSWORD trong .env.local");
      return NextResponse.json(
        { error: "Email chưa được cấu hình trên server." },
        { status: 500 }
      );
    }

    // Khởi tạo transporter với Gmail + App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Định dạng hiển thị trạng thái tham dự
    const attendanceLabel =
      attendance === "yes"
        ? "✅ Có, sẽ tham dự"
        : "❌ Rất tiếc, không thể đến";

    // Nội dung email HTML đẹp mắt
    const htmlContent = `
      <div style="
        font-family: 'Georgia', serif;
        max-width: 520px;
        margin: 0 auto;
        background: #fdf8f5;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid #f0d0d5;
        box-shadow: 0 4px 24px rgba(183,110,121,0.12);
      ">
        <!-- Header -->
        <div style="
          background: linear-gradient(135deg, #d4919a, #8f4a55);
          padding: 28px 24px;
          text-align: center;
        ">
          <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 13px; letter-spacing: 3px; text-transform: uppercase;">Thư Mời Tốt Nghiệp</p>
          <h1 style="margin: 8px 0 4px; color: #fff; font-size: 26px; font-weight: normal;">🎓 Có RSVP Mới!</h1>
          <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px;">Hoàng Mỹ Kim – ĐH Văn Lang 2026</p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 28px 20px;">
          <p style="margin: 0 0 20px; color: #7a5c5c; font-size: 14px;">
            Xin chào! Có một khách mới vừa gửi xác nhận tham dự lễ tốt nghiệp:
          </p>

          <!-- Info card -->
          <div style="background: #fff; border-radius: 12px; border: 1px solid #f0d0d5; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #7a5c5c; font-size: 13px; width: 40%; vertical-align: top;">👤 Họ và tên</td>
                <td style="padding: 8px 0; color: #3d2c2c; font-size: 14px; font-weight: bold;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #fce8e8;">
                <td style="padding: 8px 0; color: #7a5c5c; font-size: 13px; vertical-align: top;">📋 Tham dự</td>
                <td style="padding: 8px 0; color: #3d2c2c; font-size: 14px; font-weight: bold;">${attendanceLabel}</td>
              </tr>
              <tr style="border-top: 1px solid #fce8e8;">
                <td style="padding: 8px 0; color: #7a5c5c; font-size: 13px; vertical-align: top;">👥 Số người đi cùng</td>
                <td style="padding: 8px 0; color: #3d2c2c; font-size: 14px;">${guest_count > 0 ? `${guest_count} người` : "Đi một mình"}</td>
              </tr>
              ${
                message
                  ? `
              <tr style="border-top: 1px solid #fce8e8;">
                <td style="padding: 8px 0; color: #7a5c5c; font-size: 13px; vertical-align: top;">💬 Lời nhắn</td>
                <td style="padding: 8px 0; color: #3d2c2c; font-size: 14px; font-style: italic;">"${message}"</td>
              </tr>`
                  : ""
              }
            </table>
          </div>

          <p style="margin: 0; color: #7a5c5c; font-size: 13px; line-height: 1.6;">
            Bạn có thể xem toàn bộ danh sách RSVP trong bảng <strong>rsvps</strong> trên Supabase Dashboard.
          </p>
        </div>

        <!-- Footer -->
        <div style="
          background: #fce8e8;
          padding: 16px 28px;
          text-align: center;
          border-top: 1px solid #f0d0d5;
        ">
          <p style="margin: 0; font-size: 12px; color: #b76e79;">
            Thông báo tự động từ Web Thư Mời Tốt Nghiệp ✨ Hoàng Mỹ Kim
          </p>
        </div>
      </div>
    `;

    // Cấu hình email
    const mailOptions = {
      from: `"Thư Mời Tốt Nghiệp – Mỹ Kim" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFY_EMAILS || process.env.GMAIL_USER,
      subject: `🎓 [RSVP MỚI] ${name} vừa gửi phản hồi tham dự!`,
      html: htmlContent,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);

    console.log(`[send-email] ✅ Email đã gửi thành công cho: ${mailOptions.to}`);
    return NextResponse.json({ success: true, message: "Email đã được gửi!" });
  } catch (error) {
    console.error("[send-email] ❌ Lỗi khi gửi email:", error);
    return NextResponse.json(
      { error: "Không thể gửi email. Kiểm tra cấu hình App Password." },
      { status: 500 }
    );
  }
}
