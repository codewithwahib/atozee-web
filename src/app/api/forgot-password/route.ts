// // // // import { NextResponse } from 'next/server'
// // // // import { supabaseAdmin } from '@/lib/supabase/admin'
// // // // import { Resend } from 'resend'

// // // // const resend = new Resend(process.env.RESEND_API_KEY)

// // // // export async function POST(req: Request) {
// // // //   try {
// // // //     const body = await req.json()
// // // //     const { email } = body

// // // //     console.log('=== FORGOT PASSWORD ===')
// // // //     console.log('Requested email:', email)

// // // //     if (!email || typeof email !== 'string') {
// // // //       return NextResponse.json(
// // // //         { error: 'Email is required.' },
// // // //         { status: 400 }
// // // //       )
// // // //     }

// // // //     const normalizedEmail = email.toLowerCase().trim()
// // // //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// // // //     if (!emailRegex.test(normalizedEmail)) {
// // // //       return NextResponse.json(
// // // //         { error: 'Please enter a valid email address.' },
// // // //         { status: 400 }
// // // //       )
// // // //     }

// // // //     const { data: user, error: userError } =
// // // //       await supabaseAdmin
// // // //         .from('users')
// // // //         .select('id, email, first_name, last_name')
// // // //         .eq('email', normalizedEmail)
// // // //         .maybeSingle()

// // // //     if (userError) {
// // // //       console.error('User lookup error:', userError)
// // // //       return NextResponse.json(
// // // //         { error: 'Unable to check account.' },
// // // //         { status: 500 }
// // // //       )
// // // //     }

// // // //     if (!user) {
// // // //       return NextResponse.json(
// // // //         { error: 'No account found with this email.' },
// // // //         { status: 404 }
// // // //       )
// // // //     }

// // // //     const { data: logoRow, error: logoError } =
// // // //       await supabaseAdmin
// // // //         .from('logo1')
// // // //         .select('logo')
// // // //         .limit(1)
// // // //         .maybeSingle()

// // // //     if (logoError) {
// // // //       console.error('Logo fetch error:', logoError)
// // // //     }

// // // //     const logoUrl = logoRow?.logo?.trim() || ''
// // // //     console.log('Logo URL:', logoUrl)

// // // //     const resetToken = crypto.randomUUID()

// // // //     const expiresAt = new Date(
// // // //       Date.now() + 30 * 60 * 1000
// // // //     ).toISOString()

// // // //     const { error: updateError } =
// // // //       await supabaseAdmin
// // // //         .from('users')
// // // //         .update({
// // // //           reset_token: resetToken,
// // // //           reset_token_expires_at: expiresAt,
// // // //         })
// // // //         .eq('id', user.id)

// // // //     if (updateError) {
// // // //       console.error('Token save error:', updateError)
// // // //       return NextResponse.json(
// // // //         { error: 'Unable to create reset link.' },
// // // //         { status: 500 }
// // // //       )
// // // //     }

// // // //     const siteUrl =
// // // //       process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// // // //     const resetUrl = `${siteUrl}/reset-password?token=${encodeURIComponent(
// // // //       resetToken
// // // //     )}`

// // // //     const fullName = [user.first_name, user.last_name]
// // // //       .filter(Boolean)
// // // //       .join(' ')
// // // //       .trim()

// // // //     const greetingName = fullName || 'there'

// // // //     const testingEmail = 'hassanjaffer043@gmail.com'

// // // //     const { data: emailData, error: emailError } =
// // // //       await resend.emails.send({
// // // //         from: 'A to Zee Switchgear <onboarding@resend.dev>',
// // // //         to: [testingEmail],
// // // //         subject: 'Password Reset - A to Zee Switchgear',
// // // //         html: `
// // // //           <!DOCTYPE html>
// // // //           <html>
// // // //             <head>
// // // //               <meta charset="UTF-8" />
// // // //               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// // // //               <meta name="color-scheme" content="light only" />
// // // //               <meta name="supported-color-schemes" content="light only" />
// // // //               <title>Password Reset</title>

// // // //               <link rel="preconnect" href="https://fonts.googleapis.com">
// // // //               <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// // // //               <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

// // // //               <style>
// // // //                 @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

// // // //                 :root {
// // // //                   color-scheme: light only;
// // // //                   supported-color-schemes: light only;
// // // //                 }

// // // //                 * {
// // // //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// // // //                 }

// // // //                 body, table, td, p, h1, h2, h3, a, span, div {
// // // //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// // // //                 }

// // // //                 /* Force white background even in dark mode */
// // // //                 body,
// // // //                 .email-body,
// // // //                 .email-container {
// // // //                   background-color: #ffffff !important;
// // // //                   background: #ffffff !important;
// // // //                 }

// // // //                 .email-text {
// // // //                   color: #555555 !important;
// // // //                 }

// // // //                 .email-heading {
// // // //                   color: #111111 !important;
// // // //                 }

// // // //                 .email-muted {
// // // //                   color: #777777 !important;
// // // //                 }

// // // //                 .email-footer {
// // // //                   color: #999999 !important;
// // // //                 }

// // // //                 /* Gmail dark mode overrides */
// // // //                 [data-ogsc] body,
// // // //                 [data-ogsb] body,
// // // //                 [data-ogsc] .email-body,
// // // //                 [data-ogsb] .email-body,
// // // //                 [data-ogsc] .email-container,
// // // //                 [data-ogsb] .email-container {
// // // //                   background-color: #ffffff !important;
// // // //                   background: #ffffff !important;
// // // //                 }

// // // //                 [data-ogsc] .email-text,
// // // //                 [data-ogsb] .email-text {
// // // //                   color: #555555 !important;
// // // //                 }

// // // //                 [data-ogsc] .email-heading,
// // // //                 [data-ogsb] .email-heading {
// // // //                   color: #111111 !important;
// // // //                 }

// // // //                 @media (prefers-color-scheme: dark) {
// // // //                   body,
// // // //                   .email-body,
// // // //                   .email-container {
// // // //                     background-color: #ffffff !important;
// // // //                     background: #ffffff !important;
// // // //                   }
// // // //                 }
// // // //               </style>
// // // //             </head>

// // // //             <body
// // // //               class="email-body"
// // // //               style="
// // // //                 margin:0;
// // // //                 padding:0;
// // // //                 background-color:#ffffff;
// // // //                 background:#ffffff;
// // // //                 font-family:'DM Sans', Arial, Helvetica, sans-serif;
// // // //               "
// // // //             >

// // // //               <div
// // // //                 class="email-container"
// // // //                 style="
// // // //                   max-width:600px;
// // // //                   margin:40px auto;
// // // //                   background-color:#ffffff;
// // // //                   background:#ffffff;
// // // //                   padding:40px;
// // // //                   font-family:'DM Sans', Arial, Helvetica, sans-serif;
// // // //                 "
// // // //               >

// // // //                 ${
// // // //                   logoUrl
// // // //                     ? `
// // // //                 <div style="text-align:center; margin-bottom:28px;">
// // // //                   <img
// // // //                     src="${logoUrl}"
// // // //                     alt="A to Zee Switchgear Engineering (SMC) Pvt. Ltd."
// // // //                     width="160"
// // // //                     style="
// // // //                       display:block;
// // // //                       margin:0 auto;
// // // //                       max-width:160px;
// // // //                       height:auto;
// // // //                     "
// // // //                   />
// // // //                 </div>
// // // //                 `
// // // //                     : ''
// // // //                 }

// // // //                 <hr style="
// // // //                   border:none;
// // // //                   border-top:1px solid #eeeeee;
// // // //                   margin:0 0 28px;
// // // //                 " />

// // // //                 <h2
// // // //                   class="email-heading"
// // // //                   style="
// // // //                     margin:0 0 20px;
// // // //                     color:#111111 !important;
// // // //                     font-family:'DM Sans', Arial, sans-serif;
// // // //                     font-weight:700;
// // // //                   "
// // // //                 >
// // // //                   Password Reset
// // // //                 </h2>

// // // //                 <p
// // // //                   class="email-text"
// // // //                   style="
// // // //                     color:#555555 !important;
// // // //                     font-size:15px;
// // // //                     line-height:1.6;
// // // //                     font-family:'DM Sans', Arial, sans-serif;
// // // //                   "
// // // //                 >
// // // //                   Hello ${greetingName},
// // // //                 </p>

// // // //                 <p
// // // //                   class="email-text"
// // // //                   style="
// // // //                     color:#555555 !important;
// // // //                     font-size:15px;
// // // //                     line-height:1.6;
// // // //                     font-family:'DM Sans', Arial, sans-serif;
// // // //                   "
// // // //                 >
// // // //                   We received a request to reset
// // // //                   your A to Zee Switchgear account
// // // //                   password.
// // // //                 </p>

// // // //                 <div style="margin:30px 0; text-align:center;">
// // // //                   <a
// // // //                     href="${resetUrl}"
// // // //                     style="
// // // //                       display:inline-block;
// // // //                       padding:14px 28px;
// // // //                       background:#009E4D;
// // // //                       color:#ffffff !important;
// // // //                       text-decoration:none;
// // // //                       border-radius:30px;
// // // //                       font-weight:700;
// // // //                       font-size:14px;
// // // //                       font-family:'DM Sans', Arial, sans-serif;
// // // //                     "
// // // //                   >
// // // //                     RESET PASSWORD
// // // //                   </a>
// // // //                 </div>

// // // //                 <p
// // // //                   class="email-muted"
// // // //                   style="
// // // //                     color:#777777 !important;
// // // //                     font-size:14px;
// // // //                     line-height:1.6;
// // // //                     font-family:'DM Sans', Arial, sans-serif;
// // // //                   "
// // // //                 >
// // // //                   This link will expire in
// // // //                   <strong>30 minutes</strong>.
// // // //                 </p>

// // // //                 <p
// // // //                   class="email-muted"
// // // //                   style="
// // // //                     color:#777777 !important;
// // // //                     font-size:14px;
// // // //                     line-height:1.6;
// // // //                     font-family:'DM Sans', Arial, sans-serif;
// // // //                   "
// // // //                 >
// // // //                   If you did not request this
// // // //                   password reset, you can safely
// // // //                   ignore this email.
// // // //                 </p>

// // // //                 <hr style="
// // // //                   border:none;
// // // //                   border-top:1px solid #eeeeee;
// // // //                   margin:30px 0;
// // // //                 " />

// // // //                 <p
// // // //                   class="email-footer"
// // // //                   style="
// // // //                     color:#999999 !important;
// // // //                     font-size:12px;
// // // //                     margin:0;
// // // //                     font-family:'DM Sans', Arial, sans-serif;
// // // //                   "
// // // //                 >
// // // //                   © 2026 A to Zee Switchgear Engineering. All rights reserved.
// // // //                 </p>

// // // //               </div>

// // // //             </body>
// // // //           </html>
// // // //         `,
// // // //       })

// // // //     if (emailError) {
// // // //       console.error('Resend error:', emailError)

// // // //       await supabaseAdmin
// // // //         .from('users')
// // // //         .update({
// // // //           reset_token: null,
// // // //           reset_token_expires_at: null,
// // // //         })
// // // //         .eq('id', user.id)

// // // //       return NextResponse.json(
// // // //         {
// // // //           error:
// // // //             emailError.message || 'Failed to send reset email.',
// // // //         },
// // // //         { status: 500 }
// // // //       )
// // // //     }

// // // //     console.log('Email sent successfully')
// // // //     console.log('Resend email ID:', emailData?.id)

// // // //     return NextResponse.json(
// // // //       {
// // // //         message: 'Password reset link has been sent to your email.',
// // // //       },
// // // //       { status: 200 }
// // // //     )
// // // //   } catch (error: any) {
// // // //     console.error('Forgot password error:', error)

// // // //     return NextResponse.json(
// // // //       {
// // // //         error: error?.message || 'Something went wrong.',
// // // //       },
// // // //       { status: 500 }
// // // //     )
// // // //   }
// // // // }

// // // import { NextResponse } from 'next/server'
// // // import { supabaseAdmin } from '@/lib/supabase/admin'
// // // import { Resend } from 'resend'

// // // const resend = new Resend(process.env.RESEND_API_KEY)

// // // // ✅ Helper — safely extract error message (replaces `any`)
// // // const getErrorMessage = (err: unknown, fallback: string): string => {
// // //   if (err instanceof Error) return err.message
// // //   if (typeof err === 'string') return err
// // //   return fallback
// // // }

// // // export async function POST(req: Request) {
// // //   try {
// // //     const body = await req.json()
// // //     const { email } = body

// // //     console.log('=== FORGOT PASSWORD ===')
// // //     console.log('Requested email:', email)

// // //     if (!email || typeof email !== 'string') {
// // //       return NextResponse.json(
// // //         { error: 'Email is required.' },
// // //         { status: 400 }
// // //       )
// // //     }

// // //     const normalizedEmail = email.toLowerCase().trim()
// // //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// // //     if (!emailRegex.test(normalizedEmail)) {
// // //       return NextResponse.json(
// // //         { error: 'Please enter a valid email address.' },
// // //         { status: 400 }
// // //       )
// // //     }

// // //     const { data: user, error: userError } =
// // //       await supabaseAdmin
// // //         .from('users')
// // //         .select('id, email, first_name, last_name')
// // //         .eq('email', normalizedEmail)
// // //         .maybeSingle()

// // //     if (userError) {
// // //       console.error('User lookup error:', userError)
// // //       return NextResponse.json(
// // //         { error: 'Unable to check account.' },
// // //         { status: 500 }
// // //       )
// // //     }

// // //     if (!user) {
// // //       return NextResponse.json(
// // //         { error: 'No account found with this email.' },
// // //         { status: 404 }
// // //       )
// // //     }

// // //     const { data: logoRow, error: logoError } =
// // //       await supabaseAdmin
// // //         .from('logo1')
// // //         .select('logo')
// // //         .limit(1)
// // //         .maybeSingle()

// // //     if (logoError) {
// // //       console.error('Logo fetch error:', logoError)
// // //     }

// // //     const logoUrl = logoRow?.logo?.trim() || ''
// // //     console.log('Logo URL:', logoUrl)

// // //     const resetToken = crypto.randomUUID()

// // //     const expiresAt = new Date(
// // //       Date.now() + 30 * 60 * 1000
// // //     ).toISOString()

// // //     const { error: updateError } =
// // //       await supabaseAdmin
// // //         .from('users')
// // //         .update({
// // //           reset_token: resetToken,
// // //           reset_token_expires_at: expiresAt,
// // //         })
// // //         .eq('id', user.id)

// // //     if (updateError) {
// // //       console.error('Token save error:', updateError)
// // //       return NextResponse.json(
// // //         { error: 'Unable to create reset link.' },
// // //         { status: 500 }
// // //       )
// // //     }

// // //     const siteUrl =
// // //       process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// // //     const resetUrl = `${siteUrl}/reset-password?token=${encodeURIComponent(
// // //       resetToken
// // //     )}`

// // //     const fullName = [user.first_name, user.last_name]
// // //       .filter(Boolean)
// // //       .join(' ')
// // //       .trim()

// // //     const greetingName = fullName || 'there'

// // //     const testingEmail = 'hassanjaffer043@gmail.com'

// // //     const { data: emailData, error: emailError } =
// // //       await resend.emails.send({
// // //         from: 'A to Zee Switchgear <onboarding@resend.dev>',
// // //         to: [testingEmail],
// // //         subject: 'Password Reset - A to Zee Switchgear',
// // //         html: `
// // //           <!DOCTYPE html>
// // //           <html>
// // //             <head>
// // //               <meta charset="UTF-8" />
// // //               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// // //               <meta name="color-scheme" content="light only" />
// // //               <meta name="supported-color-schemes" content="light only" />
// // //               <title>Password Reset</title>

// // //               <link rel="preconnect" href="https://fonts.googleapis.com">
// // //               <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// // //               <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

// // //               <style>
// // //                 @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

// // //                 :root {
// // //                   color-scheme: light only;
// // //                   supported-color-schemes: light only;
// // //                 }

// // //                 * {
// // //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// // //                 }

// // //                 body, table, td, p, h1, h2, h3, a, span, div {
// // //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// // //                 }

// // //                 /* Force white background even in dark mode */
// // //                 body,
// // //                 .email-body,
// // //                 .email-container {
// // //                   background-color: #ffffff !important;
// // //                   background: #ffffff !important;
// // //                 }

// // //                 .email-text {
// // //                   color: #555555 !important;
// // //                 }

// // //                 .email-heading {
// // //                   color: #111111 !important;
// // //                 }

// // //                 .email-muted {
// // //                   color: #777777 !important;
// // //                 }

// // //                 .email-footer {
// // //                   color: #999999 !important;
// // //                 }

// // //                 /* Gmail dark mode overrides */
// // //                 [data-ogsc] body,
// // //                 [data-ogsb] body,
// // //                 [data-ogsc] .email-body,
// // //                 [data-ogsb] .email-body,
// // //                 [data-ogsc] .email-container,
// // //                 [data-ogsb] .email-container {
// // //                   background-color: #ffffff !important;
// // //                   background: #ffffff !important;
// // //                 }

// // //                 [data-ogsc] .email-text,
// // //                 [data-ogsb] .email-text {
// // //                   color: #555555 !important;
// // //                 }

// // //                 [data-ogsc] .email-heading,
// // //                 [data-ogsb] .email-heading {
// // //                   color: #111111 !important;
// // //                 }

// // //                 @media (prefers-color-scheme: dark) {
// // //                   body,
// // //                   .email-body,
// // //                   .email-container {
// // //                     background-color: #ffffff !important;
// // //                     background: #ffffff !important;
// // //                   }
// // //                 }
// // //               </style>
// // //             </head>

// // //             <body
// // //               class="email-body"
// // //               style="
// // //                 margin:0;
// // //                 padding:0;
// // //                 background-color:#ffffff;
// // //                 background:#ffffff;
// // //                 font-family:'DM Sans', Arial, Helvetica, sans-serif;
// // //               "
// // //             >

// // //               <div
// // //                 class="email-container"
// // //                 style="
// // //                   max-width:600px;
// // //                   margin:40px auto;
// // //                   background-color:#ffffff;
// // //                   background:#ffffff;
// // //                   padding:40px;
// // //                   font-family:'DM Sans', Arial, Helvetica, sans-serif;
// // //                 "
// // //               >

// // //                 ${
// // //                   logoUrl
// // //                     ? `
// // //                 <div style="text-align:center; margin-bottom:28px;">
// // //                   <img
// // //                     src="${logoUrl}"
// // //                     alt="A to Zee Switchgear Engineering (SMC) Pvt. Ltd."
// // //                     width="160"
// // //                     style="
// // //                       display:block;
// // //                       margin:0 auto;
// // //                       max-width:160px;
// // //                       height:auto;
// // //                     "
// // //                   />
// // //                 </div>
// // //                 `
// // //                     : ''
// // //                 }

// // //                 <hr style="
// // //                   border:none;
// // //                   border-top:1px solid #eeeeee;
// // //                   margin:0 0 28px;
// // //                 " />

// // //                 <h2
// // //                   class="email-heading"
// // //                   style="
// // //                     margin:0 0 20px;
// // //                     color:#111111 !important;
// // //                     font-family:'DM Sans', Arial, sans-serif;
// // //                     font-weight:700;
// // //                   "
// // //                 >
// // //                   Password Reset
// // //                 </h2>

// // //                 <p
// // //                   class="email-text"
// // //                   style="
// // //                     color:#555555 !important;
// // //                     font-size:15px;
// // //                     line-height:1.6;
// // //                     font-family:'DM Sans', Arial, sans-serif;
// // //                   "
// // //                 >
// // //                   Hello ${greetingName},
// // //                 </p>

// // //                 <p
// // //                   class="email-text"
// // //                   style="
// // //                     color:#555555 !important;
// // //                     font-size:15px;
// // //                     line-height:1.6;
// // //                     font-family:'DM Sans', Arial, sans-serif;
// // //                   "
// // //                 >
// // //                   We received a request to reset
// // //                   your A to Zee Switchgear account
// // //                   password.
// // //                 </p>

// // //                 <div style="margin:30px 0; text-align:center;">
// // //                   <a
// // //                     href="${resetUrl}"
// // //                     style="
// // //                       display:inline-block;
// // //                       padding:14px 28px;
// // //                       background:#009E4D;
// // //                       color:#ffffff !important;
// // //                       text-decoration:none;
// // //                       border-radius:30px;
// // //                       font-weight:700;
// // //                       font-size:14px;
// // //                       font-family:'DM Sans', Arial, sans-serif;
// // //                     "
// // //                   >
// // //                     RESET PASSWORD
// // //                   </a>
// // //                 </div>

// // //                 <p
// // //                   class="email-muted"
// // //                   style="
// // //                     color:#777777 !important;
// // //                     font-size:14px;
// // //                     line-height:1.6;
// // //                     font-family:'DM Sans', Arial, sans-serif;
// // //                   "
// // //                 >
// // //                   This link will expire in
// // //                   <strong>30 minutes</strong>.
// // //                 </p>

// // //                 <p
// // //                   class="email-muted"
// // //                   style="
// // //                     color:#777777 !important;
// // //                     font-size:14px;
// // //                     line-height:1.6;
// // //                     font-family:'DM Sans', Arial, sans-serif;
// // //                   "
// // //                 >
// // //                   If you did not request this
// // //                   password reset, you can safely
// // //                   ignore this email.
// // //                 </p>

// // //                 <hr style="
// // //                   border:none;
// // //                   border-top:1px solid #eeeeee;
// // //                   margin:30px 0;
// // //                 " />

// // //                 <p
// // //                   class="email-footer"
// // //                   style="
// // //                     color:#999999 !important;
// // //                     font-size:12px;
// // //                     margin:0;
// // //                     font-family:'DM Sans', Arial, sans-serif;
// // //                   "
// // //                 >
// // //                   © 2026 A to Zee Switchgear Engineering. All rights reserved.
// // //                 </p>

// // //               </div>

// // //             </body>
// // //           </html>
// // //         `,
// // //       })

// // //     if (emailError) {
// // //       console.error('Resend error:', emailError)

// // //       await supabaseAdmin
// // //         .from('users')
// // //         .update({
// // //           reset_token: null,
// // //           reset_token_expires_at: null,
// // //         })
// // //         .eq('id', user.id)

// // //       return NextResponse.json(
// // //         {
// // //           error:
// // //             emailError.message || 'Failed to send reset email.',
// // //         },
// // //         { status: 500 }
// // //       )
// // //     }

// // //     console.log('Email sent successfully')
// // //     console.log('Resend email ID:', emailData?.id)

// // //     return NextResponse.json(
// // //       {
// // //         message: 'Password reset link has been sent to your email.',
// // //       },
// // //       { status: 200 }
// // //     )
// // //   } catch (error: unknown) {
// // //     console.error('Forgot password error:', error)

// // //     return NextResponse.json(
// // //       {
// // //         error: getErrorMessage(error, 'Something went wrong.'),
// // //       },
// // //       { status: 500 }
// // //     )
// // //   }
// // // }


// // import { NextResponse } from 'next/server'
// // import { supabaseAdmin } from '@/lib/supabase/admin'
// // import { Resend } from 'resend'

// // const resend = new Resend(process.env.RESEND_API_KEY)

// // // ✅ Helper — safely extract error message (replaces `any`)
// // const getErrorMessage = (err: unknown, fallback: string): string => {
// //   if (err instanceof Error) return err.message
// //   if (typeof err === 'string') return err
// //   return fallback
// // }

// // export async function POST(req: Request) {
// //   try {
// //     const body = await req.json()
// //     const { email } = body

// //     console.log('=== FORGOT PASSWORD ===')
// //     console.log('Requested email:', email)

// //     if (!email || typeof email !== 'string') {
// //       return NextResponse.json(
// //         { error: 'Email is required.' },
// //         { status: 400 }
// //       )
// //     }

// //     const normalizedEmail = email.toLowerCase().trim()
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// //     if (!emailRegex.test(normalizedEmail)) {
// //       return NextResponse.json(
// //         { error: 'Please enter a valid email address.' },
// //         { status: 400 }
// //       )
// //     }

// //     const { data: user, error: userError } =
// //       await supabaseAdmin
// //         .from('users')
// //         .select('id, email, first_name, last_name')
// //         .eq('email', normalizedEmail)
// //         .maybeSingle()

// //     if (userError) {
// //       console.error('User lookup error:', userError)
// //       return NextResponse.json(
// //         { error: 'Unable to check account.' },
// //         { status: 500 }
// //       )
// //     }

// //     if (!user) {
// //       return NextResponse.json(
// //         { error: 'No account found with this email.' },
// //         { status: 404 }
// //       )
// //     }

// //     const { data: logoRow, error: logoError } =
// //       await supabaseAdmin
// //         .from('logo1')
// //         .select('logo')
// //         .limit(1)
// //         .maybeSingle()

// //     if (logoError) {
// //       console.error('Logo fetch error:', logoError)
// //     }

// //     const logoUrl = logoRow?.logo?.trim() || ''
// //     console.log('Logo URL:', logoUrl)

// //     const resetToken = crypto.randomUUID()

// //     const expiresAt = new Date(
// //       Date.now() + 30 * 60 * 1000
// //     ).toISOString()

// //     const { error: updateError } =
// //       await supabaseAdmin
// //         .from('users')
// //         .update({
// //           reset_token: resetToken,
// //           reset_token_expires_at: expiresAt,
// //         })
// //         .eq('id', user.id)

// //     if (updateError) {
// //       console.error('Token save error:', updateError)
// //       return NextResponse.json(
// //         { error: 'Unable to create reset link.' },
// //         { status: 500 }
// //       )
// //     }

// //     const siteUrl =
// //       process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// //     const resetUrl = `${siteUrl}/reset-password?token=${encodeURIComponent(
// //       resetToken
// //     )}`

// //     const fullName = [user.first_name, user.last_name]
// //       .filter(Boolean)
// //       .join(' ')
// //       .trim()

// //     const greetingName = fullName || 'there'

// //     const testingEmail = 'hassanjaffer043@gmail.com'

// //     const { data: emailData, error: emailError } =
// //       await resend.emails.send({
// //         from: 'A to Zee Switchgear Engineering (SMC) Pvt. Ltd. <onboarding@resend.dev>',
// //         to: [testingEmail],
// //         subject: 'Password Reset - A to Zee Switchgear Engineering (SMC) Pvt. Ltd.',
// //         html: `
// //           <!DOCTYPE html>
// //           <html>
// //             <head>
// //               <meta charset="UTF-8" />
// //               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// //               <meta name="color-scheme" content="light only" />
// //               <meta name="supported-color-schemes" content="light only" />
// //               <title>Password Reset</title>

// //               <link rel="preconnect" href="https://fonts.googleapis.com">
// //               <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// //               <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

// //               <style>
// //                 @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

// //                 :root {
// //                   color-scheme: light only;
// //                   supported-color-schemes: light only;
// //                 }

// //                 /* ✅ DM Sans applied everywhere */
// //                 * {
// //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// //                 }

// //                 body, table, td, p, h1, h2, h3, h4, h5, h6, a, span, div, strong, em, small, hr {
// //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// //                 }

// //                 /* Force white background even in dark mode */
// //                 body,
// //                 .email-body,
// //                 .email-container {
// //                   background-color: #ffffff !important;
// //                   background: #ffffff !important;
// //                 }

// //                 .email-text {
// //                   color: #555555 !important;
// //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// //                 }

// //                 .email-heading {
// //                   color: #111111 !important;
// //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// //                 }

// //                 .email-muted {
// //                   color: #777777 !important;
// //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// //                 }

// //                 .email-footer {
// //                   color: #999999 !important;
// //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// //                 }

// //                 /* Gmail dark mode overrides */
// //                 [data-ogsc] body,
// //                 [data-ogsb] body,
// //                 [data-ogsc] .email-body,
// //                 [data-ogsb] .email-body,
// //                 [data-ogsc] .email-container,
// //                 [data-ogsb] .email-container {
// //                   background-color: #ffffff !important;
// //                   background: #ffffff !important;
// //                 }

// //                 [data-ogsc] .email-text,
// //                 [data-ogsb] .email-text {
// //                   color: #555555 !important;
// //                 }

// //                 [data-ogsc] .email-heading,
// //                 [data-ogsb] .email-heading {
// //                   color: #111111 !important;
// //                 }

// //                 @media (prefers-color-scheme: dark) {
// //                   body,
// //                   .email-body,
// //                   .email-container {
// //                     background-color: #ffffff !important;
// //                     background: #ffffff !important;
// //                   }
// //                 }
// //               </style>
// //             </head>

// //             <body
// //               class="email-body"
// //               style="
// //                 margin:0;
// //                 padding:0;
// //                 background-color:#ffffff;
// //                 background:#ffffff;
// //                 font-family:'DM Sans', Arial, Helvetica, sans-serif;
// //               "
// //             >

// //               <div
// //                 class="email-container"
// //                 style="
// //                   max-width:600px;
// //                   margin:40px auto;
// //                   background-color:#ffffff;
// //                   background:#ffffff;
// //                   padding:40px;
// //                   font-family:'DM Sans', Arial, Helvetica, sans-serif;
// //                 "
// //               >

// //                 ${
// //                   logoUrl
// //                     ? `
// //                 <div style="text-align:center; margin-bottom:28px;">
// //                   <img
// //                     src="${logoUrl}"
// //                     alt="A to Zee Switchgear Engineering (SMC) Pvt. Ltd."
// //                     width="160"
// //                     style="
// //                       display:block;
// //                       margin:0 auto;
// //                       max-width:160px;
// //                       height:auto;
// //                     "
// //                   />
// //                 </div>
// //                 `
// //                     : ''
// //                 }

// //                 <hr style="
// //                   border:none;
// //                   border-top:1px solid #eeeeee;
// //                   margin:0 0 28px;
// //                 " />

// //                 <h2
// //                   class="email-heading"
// //                   style="
// //                     margin:0 0 20px;
// //                     color:#111111 !important;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                     font-weight:700;
// //                   "
// //                 >
// //                   Password Reset
// //                 </h2>

// //                 <p
// //                   class="email-text"
// //                   style="
// //                     color:#555555 !important;
// //                     font-size:15px;
// //                     line-height:1.6;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                   "
// //                 >
// //                   Hello ${greetingName},
// //                 </p>

// //                 <p
// //                   class="email-text"
// //                   style="
// //                     color:#555555 !important;
// //                     font-size:15px;
// //                     line-height:1.6;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                   "
// //                 >
// //                   We received a request to reset
// //                   your A to Zee Switchgear Engineering (SMC) Pvt. Ltd.
// //                   account password.
// //                 </p>

// //                 <div style="margin:30px 0; text-align:center;">
// //                   <a
// //                     href="${resetUrl}"
// //                     style="
// //                       display:inline-block;
// //                       padding:14px 28px;
// //                       background:#009E4D;
// //                       color:#ffffff !important;
// //                       text-decoration:none;
// //                       border-radius:30px;
// //                       font-weight:700;
// //                       font-size:14px;
// //                       font-family:'DM Sans', Arial, sans-serif;
// //                     "
// //                   >
// //                     RESET PASSWORD
// //                   </a>
// //                 </div>

// //                 <p
// //                   class="email-muted"
// //                   style="
// //                     color:#777777 !important;
// //                     font-size:14px;
// //                     line-height:1.6;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                   "
// //                 >
// //                   This link will expire in
// //                   <strong>30 minutes</strong>.
// //                 </p>

// //                 <p
// //                   class="email-muted"
// //                   style="
// //                     color:#777777 !important;
// //                     font-size:14px;
// //                     line-height:1.6;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                   "
// //                 >
// //                   If you did not request this
// //                   password reset, you can safely
// //                   ignore this email.
// //                 </p>

// //                 <hr style="
// //                   border:none;
// //                   border-top:1px solid #eeeeee;
// //                   margin:30px 0;
// //                 " />

// //                 <p
// //                   class="email-footer"
// //                   style="
// //                     color:#999999 !important;
// //                     font-size:12px;
// //                     margin:0;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                   "
// //                 >
// //                   © 2026 A to Zee Switchgear Engineering (SMC) Pvt. Ltd. All rights reserved.
// //                 </p>

// //               </div>

// //             </body>
// //           </html>
// //         `,
// //       })

// //     if (emailError) {
// //       console.error('Resend error:', emailError)

// //       await supabaseAdmin
// //         .from('users')
// //         .update({
// //           reset_token: null,
// //           reset_token_expires_at: null,
// //         })
// //         .eq('id', user.id)

// //       return NextResponse.json(
// //         {
// //           error:
// //             emailError.message || 'Failed to send reset email.',
// //         },
// //         { status: 500 }
// //       )
// //     }

// //     console.log('Email sent successfully')
// //     console.log('Resend email ID:', emailData?.id)

// //     return NextResponse.json(
// //       {
// //         message: 'Password reset link has been sent to your email.',
// //       },
// //       { status: 200 }
// //     )
// //   } catch (error: unknown) {
// //     console.error('Forgot password error:', error)

// //     return NextResponse.json(
// //       {
// //         error: getErrorMessage(error, 'Something went wrong.'),
// //       },
// //       { status: 500 }
// //     )
// //   }
// // }


// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// // ✅ Helper — safely extract error message (replaces `any`)
// const getErrorMessage = (err: unknown, fallback: string): string => {
//   if (err instanceof Error) return err.message
//   if (typeof err === 'string') return err
//   return fallback
// }

// /**
//  * ✅ Resolve the public site URL used inside emails.
//  *
//  * FIX: Vercel provides TWO env vars:
//  *   - VERCEL_URL                      → unique per deployment (with hash) ❌
//  *   - VERCEL_PROJECT_PRODUCTION_URL   → stable production domain ✅
//  *
//  * Priority:
//  *   1. NEXT_PUBLIC_SITE_URL (only if NOT localhost)
//  *   2. VERCEL_PROJECT_PRODUCTION_URL  ← stable production domain ✅
//  *   3. VERCEL_URL                     ← per-deployment (fallback)
//  *   4. Request headers (custom domains)
//  *   5. http://localhost:3000 (dev only)
//  */
// function getSiteUrl(req: Request): string {
//   // 1. Explicit env var — but ONLY if it's a real domain
//   const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
//   if (
//     envUrl &&
//     !envUrl.includes('localhost') &&
//     !envUrl.includes('127.0.0.1')
//   ) {
//     return envUrl.replace(/\/+$/, '') // strip trailing slash
//   }

//   // 2. ✅ Vercel PRODUCTION URL (stable, clean domain)
//   const vercelProdUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
//   if (vercelProdUrl && !vercelProdUrl.includes('localhost')) {
//     return `https://${vercelProdUrl}`
//   }

//   // 3. Vercel deployment URL (unique per deploy — fallback)
//   const vercelUrl = process.env.VERCEL_URL?.trim()
//   if (vercelUrl && !vercelUrl.includes('localhost')) {
//     return `https://${vercelUrl}`
//   }

//   // 4. Derive from request headers (works on custom domains)
//   try {
//     const proto = req.headers.get('x-forwarded-proto') || 'https'
//     const host =
//       req.headers.get('x-forwarded-host') || req.headers.get('host')

//     if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
//       return `${proto}://${host}`
//     }
//   } catch {
//     /* ignore */
//   }

//   // 5. Fallback (dev only)
//   return 'http://localhost:3000'
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const { email } = body

//     console.log('=== FORGOT PASSWORD ===')
//     console.log('Requested email:', email)

//     if (!email || typeof email !== 'string') {
//       return NextResponse.json(
//         { error: 'Email is required.' },
//         { status: 400 }
//       )
//     }

//     const normalizedEmail = email.toLowerCase().trim()
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//     if (!emailRegex.test(normalizedEmail)) {
//       return NextResponse.json(
//         { error: 'Please enter a valid email address.' },
//         { status: 400 }
//       )
//     }

//     const { data: user, error: userError } = await supabaseAdmin
//       .from('users')
//       .select('id, email, first_name, last_name')
//       .eq('email', normalizedEmail)
//       .maybeSingle()

//     if (userError) {
//       console.error('User lookup error:', userError)
//       return NextResponse.json(
//         { error: 'Unable to check account.' },
//         { status: 500 }
//       )
//     }

//     if (!user) {
//       return NextResponse.json(
//         { error: 'No account found with this email.' },
//         { status: 404 }
//       )
//     }

//     const { data: logoRow, error: logoError } = await supabaseAdmin
//       .from('logo1')
//       .select('logo')
//       .limit(1)
//       .maybeSingle()

//     if (logoError) {
//       console.error('Logo fetch error:', logoError)
//     }

//     const logoUrl = logoRow?.logo?.trim() || ''
//     console.log('Logo URL:', logoUrl)

//     const resetToken = crypto.randomUUID()

//     const expiresAt = new Date(
//       Date.now() + 30 * 60 * 1000
//     ).toISOString()

//     const { error: updateError } = await supabaseAdmin
//       .from('users')
//       .update({
//         reset_token: resetToken,
//         reset_token_expires_at: expiresAt,
//       })
//       .eq('id', user.id)

//     if (updateError) {
//       console.error('Token save error:', updateError)
//       return NextResponse.json(
//         { error: 'Unable to create reset link.' },
//         { status: 500 }
//       )
//     }

//     // ✅ FIXED — resolves to stable production domain (not the hashed one)
//     const siteUrl = getSiteUrl(req)

//     const resetUrl = `${siteUrl}/reset-password?token=${encodeURIComponent(
//       resetToken
//     )}`

//     console.log('Site URL resolved to:', siteUrl)
//     console.log('Reset URL:', resetUrl)
//     console.log('📧 Sending email to:', user.email)

//     const fullName = [user.first_name, user.last_name]
//       .filter(Boolean)
//       .join(' ')
//       .trim()

//     const greetingName = fullName || 'there'

//     // ============================================================
//     // ✅ FIXED: Email ab asli user ko jayegi (hardcoded testing email hata di)
//     // ============================================================
//     const { data: emailData, error: emailError } = await resend.emails.send({
//       // ⚠️ NOTE: 'onboarding@resend.dev' sirf testing ke liye hai.
//       //    Production mein apna domain verify karke yeh use karein:
//       //    from: 'A to Zee Switchgear <noreply@atozeeswitchgear.com>',
//       from: 'A to Zee Switchgear Engineering (SMC) Pvt. Ltd. <onboarding@resend.dev>',

//       // ✅ ASLI USER KA EMAIL
//       to: [user.email],

//       subject:
//         'Password Reset - A to Zee Switchgear Engineering (SMC) Pvt. Ltd.',
//       html: `
//           <!DOCTYPE html>
//           <html>
//             <head>
//               <meta charset="UTF-8" />
//               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//               <meta name="color-scheme" content="light only" />
//               <meta name="supported-color-schemes" content="light only" />
//               <title>Password Reset</title>

//               <link rel="preconnect" href="https://fonts.googleapis.com">
//               <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//               <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

//               <style>
//                 @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

//                 :root {
//                   color-scheme: light only;
//                   supported-color-schemes: light only;
//                 }

//                 /* ✅ DM Sans applied everywhere */
//                 * {
//                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
//                 }

//                 body, table, td, p, h1, h2, h3, h4, h5, h6, a, span, div, strong, em, small, hr {
//                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
//                 }

//                 /* Force white background even in dark mode */
//                 body,
//                 .email-body,
//                 .email-container {
//                   background-color: #ffffff !important;
//                   background: #ffffff !important;
//                 }

//                 .email-text {
//                   color: #555555 !important;
//                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
//                 }

//                 .email-heading {
//                   color: #111111 !important;
//                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
//                 }

//                 .email-muted {
//                   color: #777777 !important;
//                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
//                 }

//                 .email-footer {
//                   color: #999999 !important;
//                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
//                 }

//                 /* Gmail dark mode overrides */
//                 [data-ogsc] body,
//                 [data-ogsb] body,
//                 [data-ogsc] .email-body,
//                 [data-ogsb] .email-body,
//                 [data-ogsc] .email-container,
//                 [data-ogsb] .email-container {
//                   background-color: #ffffff !important;
//                   background: #ffffff !important;
//                 }

//                 [data-ogsc] .email-text,
//                 [data-ogsb] .email-text {
//                   color: #555555 !important;
//                 }

//                 [data-ogsc] .email-heading,
//                 [data-ogsb] .email-heading {
//                   color: #111111 !important;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                   body,
//                   .email-body,
//                   .email-container {
//                     background-color: #ffffff !important;
//                     background: #ffffff !important;
//                   }
//                 }
//               </style>
//             </head>

//             <body
//               class="email-body"
//               style="
//                 margin:0;
//                 padding:0;
//                 background-color:#ffffff;
//                 background:#ffffff;
//                 font-family:'DM Sans', Arial, Helvetica, sans-serif;
//               "
//             >

//               <div
//                 class="email-container"
//                 style="
//                   max-width:600px;
//                   margin:40px auto;
//                   background-color:#ffffff;
//                   background:#ffffff;
//                   padding:40px;
//                   font-family:'DM Sans', Arial, Helvetica, sans-serif;
//                 "
//               >

//                 ${
//                   logoUrl
//                     ? `
//                 <div style="text-align:center; margin-bottom:28px;">
//                   <img
//                     src="${logoUrl}"
//                     alt="A to Zee Switchgear Engineering (SMC) Pvt. Ltd."
//                     width="160"
//                     style="
//                       display:block;
//                       margin:0 auto;
//                       max-width:160px;
//                       height:auto;
//                     "
//                   />
//                 </div>
//                 `
//                     : ''
//                 }

//                 <hr style="
//                   border:none;
//                   border-top:1px solid #eeeeee;
//                   margin:0 0 28px;
//                 " />

//                 <h2
//                   class="email-heading"
//                   style="
//                     margin:0 0 20px;
//                     color:#111111 !important;
//                     font-family:'DM Sans', Arial, sans-serif;
//                     font-weight:700;
//                   "
//                 >
//                   Password Reset
//                 </h2>

//                 <p
//                   class="email-text"
//                   style="
//                     color:#555555 !important;
//                     font-size:15px;
//                     line-height:1.6;
//                     font-family:'DM Sans', Arial, sans-serif;
//                   "
//                 >
//                   Hello ${greetingName},
//                 </p>

//                 <p
//                   class="email-text"
//                   style="
//                     color:#555555 !important;
//                     font-size:15px;
//                     line-height:1.6;
//                     font-family:'DM Sans', Arial, sans-serif;
//                   "
//                 >
//                   We received a request to reset
//                   your A to Zee Switchgear Engineering (SMC) Pvt. Ltd.
//                   account password.
//                 </p>

//                 <div style="margin:30px 0; text-align:center;">
//                   <a
//                     href="${resetUrl}"
//                     style="
//                       display:inline-block;
//                       padding:14px 28px;
//                       background:#009E4D;
//                       color:#ffffff !important;
//                       text-decoration:none;
//                       border-radius:30px;
//                       font-weight:700;
//                       font-size:14px;
//                       font-family:'DM Sans', Arial, sans-serif;
//                     "
//                   >
//                     RESET PASSWORD
//                   </a>
//                 </div>

//                 <p
//                   class="email-muted"
//                   style="
//                     color:#777777 !important;
//                     font-size:14px;
//                     line-height:1.6;
//                     font-family:'DM Sans', Arial, sans-serif;
//                   "
//                 >
//                   This link will expire in
//                   <strong>30 minutes</strong>.
//                 </p>

//                 <p
//                   class="email-muted"
//                   style="
//                     color:#777777 !important;
//                     font-size:14px;
//                     line-height:1.6;
//                     font-family:'DM Sans', Arial, sans-serif;
//                   "
//                 >
//                   If you did not request this
//                   password reset, you can safely
//                   ignore this email.
//                 </p>

//                 <hr style="
//                   border:none;
//                   border-top:1px solid #eeeeee;
//                   margin:30px 0;
//                 " />

//                 <p
//                   class="email-footer"
//                   style="
//                     color:#999999 !important;
//                     font-size:12px;
//                     margin:0;
//                     font-family:'DM Sans', Arial, sans-serif;
//                   "
//                 >
//                   © 2026 A to Zee Switchgear Engineering (SMC) Pvt. Ltd. All rights reserved.
//                 </p>

//               </div>

//             </body>
//           </html>
//         `,
//     })

//     if (emailError) {
//       console.error('Resend error:', emailError)

//       await supabaseAdmin
//         .from('users')
//         .update({
//           reset_token: null,
//           reset_token_expires_at: null,
//         })
//         .eq('id', user.id)

//       return NextResponse.json(
//         {
//           error: emailError.message || 'Failed to send reset email.',
//         },
//         { status: 500 }
//       )
//     }

//     console.log('✅ Email sent successfully to:', user.email)
//     console.log('Resend email ID:', emailData?.id)

//     return NextResponse.json(
//       {
//         message: 'Password reset link has been sent to your email.',
//       },
//       { status: 200 }
//     )
//   } catch (error: unknown) {
//     console.error('Forgot password error:', error)

//     return NextResponse.json(
//       {
//         error: getErrorMessage(error, 'Something went wrong.'),
//       },
//       { status: 500 }
//     )
//   }
// }


import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

// ✅ Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// ✅ Helper — safely extract error message
const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return fallback
}

/**
 * ✅ Resolve the public site URL used inside emails.
 */
function getSiteUrl(req: Request): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (
    envUrl &&
    !envUrl.includes('localhost') &&
    !envUrl.includes('127.0.0.1')
  ) {
    return envUrl.replace(/\/+$/, '')
  }

  const vercelProdUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (vercelProdUrl && !vercelProdUrl.includes('localhost')) {
    return `https://${vercelProdUrl}`
  }

  const vercelUrl = process.env.VERCEL_URL?.trim()
  if (vercelUrl && !vercelUrl.includes('localhost')) {
    return `https://${vercelUrl}`
  }

  try {
    const proto = req.headers.get('x-forwarded-proto') || 'https'
    const host =
      req.headers.get('x-forwarded-host') || req.headers.get('host')

    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      return `${proto}://${host}`
    }
  } catch {
    /* ignore */
  }

  return 'http://localhost:3000'
}

/**
 * ✅ Read image from /public and convert to base64 data URI.
 * Falls back to absolute URL if file is missing.
 */
function getLogoDataUri(siteUrl: string, logoFromDb: string): string {
  if (logoFromDb && /^https?:\/\//i.test(logoFromDb)) {
    return logoFromDb
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'quality.png')
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath)
      const base64 = fileBuffer.toString('base64')
      return `data:image/png;base64,${base64}`
    }
  } catch (err) {
    console.error('Failed to read local logo:', err)
  }

  return `${siteUrl}/quality.png`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    console.log('=== FORGOT PASSWORD ===')
    console.log('Requested email:', email)

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name, last_name')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (userError) {
      console.error('User lookup error:', userError)
      return NextResponse.json(
        { error: 'Unable to check account.' },
        { status: 500 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email.' },
        { status: 404 }
      )
    }

    const { data: logoRow } = await supabaseAdmin
      .from('logo1')
      .select('logo')
      .limit(1)
      .maybeSingle()

    const logoFromDb = logoRow?.logo?.trim() || ''

    const resetToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString()

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        reset_token: resetToken,
        reset_token_expires_at: expiresAt,
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Token save error:', updateError)
      return NextResponse.json(
        { error: 'Unable to create reset link.' },
        { status: 500 }
      )
    }

    const siteUrl = getSiteUrl(req)
    const resetUrl = `${siteUrl}/reset-password?token=${encodeURIComponent(
      resetToken
    )}`

    const logoUrl = getLogoDataUri(siteUrl, logoFromDb)

    console.log('Reset URL:', resetUrl)
    console.log('📧 Sending email to:', user.email)
    console.log('🖼️ Logo type:', logoUrl.startsWith('data:') ? 'base64' : 'url')

    const fullName = [user.first_name, user.last_name]
      .filter(Boolean)
      .join(' ')
      .trim()

    const greetingName = fullName || 'there'

    const textVersion = `
Hello ${greetingName},

We received a request to reset your A to Zee Switchgear Engineering (SMC) Pvt. Ltd. account password.

To reset your password, click the link below:
${resetUrl}

This link will expire in 30 minutes.

If you did not request this password reset, you can safely ignore this email.

---
© 2026 A to Zee Switchgear Engineering (SMC) Pvt. Ltd. All rights reserved.
    `.trim()

    // ✅ HTML — LOGO SIZE BARHA (220px desktop, 180px mobile)
    const htmlVersion = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="color-scheme" content="light only" />
            <meta name="supported-color-schemes" content="light only" />
            <title>Password Reset</title>

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

            <style>
              @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
              * { font-family: 'DM Sans', Arial, Helvetica, sans-serif !important; }
              body, table, td, p, h1, h2, h3, a, span, div {
                font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
              }
              body, .email-body, .email-container {
                background-color: #ffffff !important;
                background: #ffffff !important;
              }
              /* ✅ Mobile pe logo chhota */
              @media only screen and (max-width: 480px) {
                .email-logo {
                  width: 180px !important;
                  max-width: 180px !important;
                }
              }
            </style>
          </head>

          <body style="margin:0;padding:0;background:#ffffff;font-family:'DM Sans', Arial, Helvetica, sans-serif;">
            <div style="max-width:600px;margin:40px auto;background:#ffffff;padding:40px;">

              <div style="text-align:center; margin-bottom:32px;">
                <img
                  src="${logoUrl}"
                  alt="A to Zee Switchgear Engineering (SMC) Pvt. Ltd."
                  class="email-logo"
                  width="220"
                  style="
                    display:block;
                    margin:0 auto;
                    width:220px;
                    max-width:220px;
                    height:auto;
                    border:0;
                    outline:none;
                    text-decoration:none;
                  "
                />
              </div>

              <hr style="border:none;border-top:1px solid #eeeeee;margin:0 0 28px;" />

              <h2 style="margin:0 0 20px;color:#111111;font-weight:700;">
                Password Reset
              </h2>

              <p style="color:#555555;font-size:15px;line-height:1.6;">
                Hello ${greetingName},
              </p>

              <p style="color:#555555;font-size:15px;line-height:1.6;">
                We received a request to reset your A to Zee Switchgear Engineering (SMC) Pvt. Ltd. account password.
              </p>

              <div style="margin:30px 0; text-align:center;">
                <a href="${resetUrl}" style="display:inline-block;padding:14px 28px;background:#009E4D;color:#ffffff !important;text-decoration:none;border-radius:30px;font-weight:700;font-size:14px;">
                  RESET PASSWORD
                </a>
              </div>

              <p style="color:#777777;font-size:14px;line-height:1.6;">
                This link will expire in <strong>30 minutes</strong>.
              </p>

              <p style="color:#777777;font-size:14px;line-height:1.6;">
                If you did not request this password reset, you can safely ignore this email.
              </p>

              <hr style="border:none;border-top:1px solid #eeeeee;margin:30px 0;" />

              <p style="color:#999999;font-size:12px;margin:0;">
                © 2026 A to Zee Switchgear Engineering (SMC) Pvt. Ltd. All rights reserved.
              </p>

            </div>
          </body>
        </html>
    `

    await transporter.sendMail({
      from: `"A to Zee Switchgear" <${process.env.GMAIL_USER}>`,
      to: user.email,
      replyTo: process.env.GMAIL_USER,
      subject: 'Password Reset Request - A to Zee Switchgear',
      text: textVersion,
      html: htmlVersion,
      headers: {
        'X-Entity-Ref-ID': resetToken,
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
        'List-Unsubscribe': `<mailto:${process.env.GMAIL_USER}?subject=unsubscribe>`,
      },
    })

    console.log('✅ Email sent successfully to:', user.email)

    return NextResponse.json(
      {
        message: 'Password reset link has been sent to your email.',
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('Forgot password error:', error)

    return NextResponse.json(
      {
        error: getErrorMessage(error, 'Something went wrong.'),
      },
      { status: 500 }
    )
  }
}