// Supabase configuration
const SUPABASE_URL = 'https://pvuiqfimcwjiijwklbll.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_fQECCsxmVFT008GceAD8GA_SzeXobm0';

// Create Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check current user
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();
        return { user, userData };
    }
    return null;
}

// Logout function
async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
}
