export function handleKakaoLogin() {
    window.Kakao.Auth.login({
        success: function (authObj) {
            console.log("Kakao login successful:", authObj);
            // 로그인 성공 후 사용자 정보 요청
            fetchKakaoUserInfo();
        },
        fail: function (err) {
            console.error("Kakao login failed:", err);
        },
    });
}

export function fetchKakaoUserInfo() {
    window.Kakao.API.request({
        url: "/v2/user/me",
        success: function (res) {
            console.log("User info:", res);
            const { id, kakao_account } = res;
            console.log("User ID:", id);
            console.log("email", kakao_account.email)
            // 사용자 정보를 사용해 원하는 작업 수행 (예: 데이터베이스 저장 등)
        },
        fail: function (err) {
            console.error("Failed to fetch user info:", err);
        },
    });
}

export function handleKakaoLogout() {
    window.Kakao.Auth.logout(function() {
        console.log("Kakao logout successful");
    });
}