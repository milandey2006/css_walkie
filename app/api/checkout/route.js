import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer, cart, total, dates } = body;

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Champion Rentals <onboarding@resend.dev>', 
      // TO: Switch back to walkietalkie@championsecuritysystem.com after verifying domain
      to: 'deymilan066@gmail.com',
      subject: `New Rental Request: ${customer.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
          <h1 style="color: #0f172a; font-size: 24px; font-weight: 800; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Booking Request</h1>
          
          <div style="margin: 20px 0; background: #f8fafc; padding: 15px; border-radius: 8px;">
            <h2 style="font-size: 14px; color: #64748b; text-transform: uppercase; margin-bottom: 10px;">Customer Details</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${customer.name}</p>
            <p style="margin: 5px 0;"><strong>Company:</strong> ${customer.company || "N/A"}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${customer.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${customer.phone}</p>
          </div>

          <div style="margin: 20px 0; background: #f8fafc; padding: 15px; border-radius: 8px;">
            <h2 style="font-size: 14px; color: #64748b; text-transform: uppercase; margin-bottom: 10px;">Delivery Details</h2>
            <p style="margin: 5px 0;"><strong>Location/City:</strong> ${customer.location}</p>
            <p style="margin: 5px 0;"><strong>Full Address:</strong> ${customer.address}</p>
            ${customer.notes ? `<p style="margin: 5px 0;"><strong>Notes:</strong> ${customer.notes}</p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h2 style="font-size: 14px; color: #64748b; text-transform: uppercase; margin-bottom: 10px;">Rental Window</h2>
            <p style="margin: 5px 0; font-weight: bold; color: #3b82f6;">${dates.start} — ${dates.end}</p>
          </div>

          <div style="margin: 20px 0;">
            <h2 style="font-size: 14px; color: #64748b; text-transform: uppercase; margin-bottom: 10px;">Equipment Loadout</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="text-align: left; border-bottom: 1px solid #e2e8f0;">
                  <th style="padding: 10px 0;">Item</th>
                  <th style="padding: 10px 5px; text-align: center;">Qty</th>
                </tr>
              </thead>
              <tbody>
                ${cart.map(item => `
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; font-weight: 600; color: #334155;">${item.name}</td>
                    <td style="padding: 10px 5px; text-align: center; color: #64748b;">${item.quantity}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="margin-top: 30px; text-align: right; padding: 20px; background: #0f172a; border-radius: 12px; color: white;">
            <span style="font-size: 12px; text-transform: uppercase; opacity: 0.7;">Grand Total:</span>
            <div style="font-size: 32px; font-weight: 900;">₹${total}</div>
          </div>

          <div style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
            Sent automatically from Champion Rentals booking system.
          </div>
        </div>
      `
    });

    if (error) {
       console.error("Resend Error:", error);
       return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Order request received successfully. We will contact you shortly to confirm." 
    });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
