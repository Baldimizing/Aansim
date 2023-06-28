export const USERS = Array.from({ length: 100 }, (_, index) => {
    return {
        id: index,
        name: `유저 ${index}`,
        type: index % 2 === 0 ? '판매자' : '구매자',
        introduction: `안녕하세요, ${index % 2 === 0 ? '판매자' : '구매자'} 유저 ${index}입니다!`,
        rating: Math.round(Math.random() * 100),
        verificationStatus: true,
    };
});
