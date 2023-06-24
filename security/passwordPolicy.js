const validatePassword = (password) => {
    const minLength = 1;
    const regetPatterns = [
        /[a-z]/, // 소문자
        /[A-Z]/, // 대문자
        /\d/, // 정수
        /[^a-zA-Z0-9]/ // 특수문자
    ];

    if (password.length < minLength) {
        throw new Error( '비밀번호는 최소 ${minLength}자 이상이어야 합니다.');
    }

    for (const pattern of regexPattern) {
        if (!pattern.test(password)) {
            throw new Error('비밀번호는 소문자, 대문자, 숫자, 특수문자를 모두 포함해야 합니다.');
        }
    }
};

module.exports = { validatePassword };