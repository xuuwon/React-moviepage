import supabase from "./supabaseClient"

export const addBookmark = async (movieId, userId) => {
    console.log('User ID:', userId); // 확인용 콘솔 출력
    console.log('Movie ID:', movieId); // 확인용 콘솔 출력
    
    if (userId) {
        const { data, error } = await supabase
            .from('bookmark')
            .insert([{ user_id: userId, movie_id: movieId }]);
        
        if (error) {
            console.error("Error adding bookmark:", error);
        } else {
            console.log("Bookmark added:", data);
        }
    } else {
        console.error("User ID is not available");
    }
};

export const fetchBookmarks = async (userId) => {
    if (userId) {
        const { data, error } = await supabase
            .from('bookmark')
            .select('*')
            .eq('user_id', userId);
        
        return data;
    }
};

export const deleteBookmark = async (movieId, userId) => {
    console.log('User ID:', userId); // 확인용 콘솔 출력
    console.log('Movie ID:', movieId); // 확인용 콘솔 출력

    if (userId) {
        const { data, error } = await supabase
            .from('bookmark')
            .delete()
            .eq('user_id', userId)
            .eq('movie_id', movieId)

        console.log(data)
    }
}