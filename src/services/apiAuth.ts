import supabase, { supabaseUrl } from "./supabase";

export const signUp = async ({ email, password }: UserType) => {
    const { data, error } = await supabase.auth.signUp({
        email, password, options: { data: { avatar: "", fullName: "" } }
    })
    if (error) throw new Error("no user found")
    return data
}
export const login = async ({ email, password }: UserType) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error("no user found")
    return data
}

export const getCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error("no user found");
    return data.user;
}
export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error("no user found");
}

export const updateCurrentUser = async ({ password, avatar, fullName }: UserType) => {
    let updateData = {};
    if (fullName) updateData = {
        data: {
            fullName,
        }
    }

    if (password) updateData = {
        password
    }

    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) throw new Error("no user found");
    if (!avatar) return data;
    const path = `avatar-${data.user.id}${Math.random()}`;
    const { error: avatarError } = await supabase.storage.from("avatars").upload(path, avatar);
    if (avatarError) throw new Error("no user found");
    const { error: errorUpdate, data: updateUser } = await supabase.auth.updateUser({ data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${path}` } });
    if (errorUpdate) throw new Error("no user found");

    return updateUser;
}