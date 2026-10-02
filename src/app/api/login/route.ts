// // import { NextResponse } from 'next/server';
// // import bcrypt from 'bcryptjs';
// // import { supabaseAdmin } from '@/lib/supabase/admin';

// // export async function POST(req: Request) {
// //   try {
// //     const body = await req.json();
// //     const { email, password } = body;

// //     console.log('=== LOGIN DEBUG ===');
// //     console.log('📥 Received email:', JSON.stringify(email));

// //     if (!email || !password) {
// //       return NextResponse.json(
// //         { error: 'Email and password are required.' },
// //         { status: 400 }
// //       );
// //     }

// //     const cleanedEmail = email.toLowerCase().trim();
// //     console.log('🧹 Cleaned email:', JSON.stringify(cleanedEmail));

// //     const { data: user, error } = await supabaseAdmin
// //       .from('users')
// //       .select('id, first_name, last_name, email, phone_number, password')
// //       .eq('email', cleanedEmail)
// //       .maybeSingle();

// //     console.log('🗄️ Supabase error:', error);
// //     console.log('🗄️ Supabase user found:', user ? 'YES' : 'NO');

// //     if (error) {
// //       console.error('User lookup error:', error);
// //       return NextResponse.json(
// //         { error: 'Login failed. Please try again.' },
// //         { status: 500 }
// //       );
// //     }

// //     if (!user) {
// //       console.log('❌ No user found with email:', cleanedEmail);
// //       return NextResponse.json(
// //         { error: 'Invalid email or password.' },
// //         { status: 401 }
// //       );
// //     }

// //     // ✅ Compare plain password with hashed password in DB
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     console.log('🔑 Password match?', isMatch);

// //     if (!isMatch) {
// //       return NextResponse.json(
// //         { error: 'Invalid email or password.' },
// //         { status: 401 }
// //       );
// //     }

// //     // ✅ Strip password before sending to client
// //     const { password: _pw, ...safeUser } = user;

// //     return NextResponse.json(
// //       {
// //         success: true,
// //         message: 'Login successful.',
// //         user: safeUser,
// //       },
// //       { status: 200 }
// //     );
// //   } catch (err) {
// //     console.error('Login error:', err);
// //     return NextResponse.json(
// //       { error: 'Something went wrong.' },
// //       { status: 500 }
// //     );
// //   }
// // }


// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import { supabaseAdmin } from '@/lib/supabase/admin';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: 'Email and password are required.' },
//         { status: 400 }
//       );
//     }

//     const cleanedEmail = email.toLowerCase().trim();

//     const { data: user, error } = await supabaseAdmin
//       .from('users')
//       .select('id, first_name, last_name, email, phone_number, password')
//       .eq('email', cleanedEmail)
//       .maybeSingle();

//     if (error) {
//       console.error('User lookup error:', error);
//       return NextResponse.json(
//         { error: 'Login failed. Please try again.' },
//         { status: 500 }
//       );
//     }

//     if (!user) {
//       return NextResponse.json(
//         { error: 'Invalid email or password.' },
//         { status: 401 }
//       );
//     }

//     // ✅ Compare plain password with hashed password in DB
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return NextResponse.json(
//         { error: 'Invalid email or password.' },
//         { status: 401 }
//       );
//     }

//     // ✅ Strip password before sending to client
//     const { password: _pw, ...safeUser } = user;

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Login successful.',
//         user: safeUser,
//       },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error('Login error:', err);
//     return NextResponse.json(
//       { error: 'Something went wrong.' },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanedEmail = email.toLowerCase().trim();

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, first_name, last_name, email, phone_number, password')
      .eq('email', cleanedEmail)
      .maybeSingle();

    if (error) {
      console.error('User lookup error:', error);
      return NextResponse.json(
        { error: 'Login failed. Please try again.' },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // ✅ Compare plain password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // ✅ Build safe user object without password
    const safeUser = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful.',
        user: safeUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}