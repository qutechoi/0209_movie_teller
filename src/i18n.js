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

// Genre options with translation keys
export const GENRE_OPTIONS = {
  ko: [
    { key: '액션', label: '액션' },
    { key: '로맨스', label: '로맨스' },
    { key: '스릴러', label: '스릴러' },
    { key: '호러', label: '호러' },
    { key: '코미디', label: '코미디' },
    { key: '애니메이션', label: '애니메이션' },
    { key: '드라마', label: '드라마' },
    { key: 'SF', label: 'SF' },
    { key: '판타지', label: '판타지' },
    { key: '다큐', label: '다큐' },
    { key: '고전', label: '고전' },
    { key: '블록버스터', label: '블록버스터' },
  ],
  en: [
    { key: '액션', label: 'Action' },
    { key: '로맨스', label: 'Romance' },
    { key: '스릴러', label: 'Thriller' },
    { key: '호러', label: 'Horror' },
    { key: '코미디', label: 'Comedy' },
    { key: '애니메이션', label: 'Animation' },
    { key: '드라마', label: 'Drama' },
    { key: 'SF', label: 'Sci-Fi' },
    { key: '판타지', label: 'Fantasy' },
    { key: '다큐', label: 'Documentary' },
    { key: '고전', label: 'Classic' },
    { key: '블록버스터', label: 'Blockbuster' },
  ],
};

// Tone options with translation keys
export const TONE_OPTIONS = {
  ko: [
    { key: '차분', label: '차분' },
    { key: '유쾌', label: '유쾌' },
    { key: '진지', label: '진지' },
    { key: '속도감', label: '속도감' },
    { key: '지적', label: '지적' },
    { key: '감성', label: '감성' },
    { key: '분석적', label: '분석적' },
  ],
  en: [
    { key: '차분', label: 'Calm' },
    { key: '유쾌', label: 'Cheerful' },
    { key: '진지', label: 'Serious' },
    { key: '속도감', label: 'Fast-paced' },
    { key: '지적', label: 'Intellectual' },
    { key: '감성', label: 'Emotional' },
    { key: '분석적', label: 'Analytical' },
  ],
};

// Spoiler options with translation keys
export const SPOILER_OPTIONS = {
  ko: [
    { key: 'no_spoiler', label: '결말 없이 감상(무스포)' },
    { key: 'light', label: '약한 스포일러' },
    { key: 'full', label: '결말 포함' },
  ],
  en: [
    { key: 'no_spoiler', label: 'No spoilers' },
    { key: 'light', label: 'Light spoilers' },
    { key: 'full', label: 'Full spoilers' },
  ],
};

export const t = (lang, key) => dict[lang]?.[key] || key;
