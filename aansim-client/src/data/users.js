export const USERS = Array.from({ length: 100 }, (_, index) => {
    return {
      id: index,
      name: `유저 ${index}`,
      type: index % 2 === 0 ? '판매자' : '구매자',
      introduction: `안녕하세요, ${index % 2 === 0 ? '판매자' : '구매자'} 유저 ${index}입니다!`,
      rating: Math.round(Math.random() * 100),
      verificationStatus: true,
      timeLog: [
        { time: '5개월전', activity: 'oo시 xx동에서 부동산 직거래 서비스 기획' },
        { time: '4개월전', activity: 'oo시 xx동에서 부동산 직거래에서 안심 생태계 기획' },
        { time: '3개월전', activity: '안심 프로젝트 착수' },
        { time: '2개월전', activity: '개발중' },
        { time: '1개월전', activity: '굉장히 쉽지않음' },
      ]
    };
  });
  