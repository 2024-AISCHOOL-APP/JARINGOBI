// Category enum 정의
export const FirstCategory = {
  1: '수입',
  2: '지출',
};

// 수입에 해당하는 second_category 정의
export const IncomeSecondCategory = {
  1: '배당금',
  2: '예금',
  3: '기타수입',
  4: '고정수입',
};

// 지출에 해당하는 second_category 정의
export const ExpenseSecondCategory = {
  1: '식비',
  2: '교통비',
  3: '의류비',
  4: '고정지출',
};

// 통계 계산
export const calculateStatistics = (data) => {
  const result = {};

  Object.values(data).forEach((entry) => {
    const { first_category, second_category, amount } = entry;

    if (!result[first_category]) {
      result[first_category] = { total: 0, items: {} };
    }

    if (!result[first_category].items[second_category]) {
      result[first_category].items[second_category] = 0;
    }

    result[first_category].items[second_category] += amount;
    result[first_category].total += amount; // first_category 총계 추가
  });

  return result;
};

// 카테고리명으로 변환
export const formatStatistics = (statistics) => {
  const formatted = {};

  for (const [firstCatKey, data] of Object.entries(statistics)) {
    const categoryName = FirstCategory[firstCatKey];
    formatted[categoryName] = {
      total: data.total,
      items: {},
    };

    for (const [secondCatKey, amount] of Object.entries(data.items)) {
      if (firstCatKey === 1) {
        // 수입
        formatted[categoryName].items[IncomeSecondCategory[secondCatKey]] = amount;
      } else if (firstCatKey === 2) {
        // 지출
        formatted[categoryName].items[ExpenseSecondCategory[secondCatKey]] = amount;
      }
    }
  }

  return formatted;
};

export const calculateMonthlyStatistics = (data) => {
  const result = {};

  data.forEach((entry) => {
    const { createdAt, first_category, second_category, amount } = entry;

    let month;
    try {
      month = new Date(createdAt).toISOString().slice(0, 7); // YYYY-MM 형식
    } catch (error) {
      console.error('Invalid date format:', createdAt);
      return;
    }

    if (!result[month]) {
      result[month] = {
        수입: { total: 0, subItems: {} },
        지출: { total: 0, subItems: {} },
      };
    }

    const categoryName = first_category === 1 ? '수입' : '지출';

    if (!result[month][categoryName].subItems[second_category]) {
      result[month][categoryName].subItems[second_category] = 0;
    }

    result[month][categoryName].subItems[second_category] += amount;
    result[month][categoryName].total += amount;
  });

  return result;
};

export const formatMonthlyStatistics = (statistics) => {
  const formatted = {};

  for (const [month, data] of Object.entries(statistics)) {
    const formattedMonth = new Date(month + '-01').toLocaleDateString('ko-KR', { month: 'short' }); // 월만 표시
    formatted[formattedMonth] = {
      수입: {
        total: data['수입'].total || 0,
        subItems: data['수입'].subItems || {},
      },
      지출: {
        total: data['지출'].total || 0,
        subItems: data['지출'].subItems || {},
      },
    };
  }

  return formatted;
};
