const dict = {
  ko: {
    title: 'Movie Channel Finder',
    subtitle: '선호 취향에 맞는 리뷰 채널 추천',
    genre: '장르',
    tone: '목소리 톤',
    spoiler: '결말 유무',
    recommend: '추천받기',
    results: '추천 채널',
    back: '뒤로',
    reason: '추천 이유',
    loading: '추천 계산 중...',
  },
  en: {
    title: 'Movie Channel Finder',
    subtitle: 'Find channels that match your taste',
    genre: 'Genre',
    tone: 'Voice tone',
    spoiler: 'Spoiler preference',
    recommend: 'Get recommendations',
    results: 'Recommended Channels',
    back: 'Back',
    reason: 'Why this channel',
    loading: 'Finding matches...',
  },
};

export const t = (lang, key) => dict[lang]?.[key] || key;
