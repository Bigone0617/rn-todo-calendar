import dayjs from "dayjs";

export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);

  // 1. 첫날 이전 공백 채우기
  /**
   * 2024년 1월
   * 1월 1일 ~ 1월 31일이 들어 있는 배열에 1일 요일을 보고 앞날짜 입력함
   * 1월 1일이 월요일이므로, 앞에 12월 31일 1개 입력됨
   */
  const startDay = dayjs(start).get("day");
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, "day");
    filledColumns.unshift(date);
  }
  // 2. 마지막날 이후 공백 채우기
  /**
   * 1월 31일 뒤 날짜 채움
   * 31일이 수요일 이므로, 목-금-토 채워짐
   */
  const endDay = dayjs(end).get("day");
  /**
    0 -> 6
    1 -> 5
    2 -> 4
    endDay + ? = 6
   */
  for (let i = 1; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, "day");
    filledColumns.push(date);
  }

  return filledColumns;
};
export const getCalendarColumns = (now) => {
  const start = dayjs(now).startOf("month");
  const end = dayjs(now).endOf("month");
  const endDate = dayjs(end).get("date");

  /**
   * 1월을 예시
   * 배열에 1월 1일 ~ 1월 31일까지 입력
   */
  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, "day");
    columns.push(date);
  }

  const filledColumns = fillEmptyColumns(columns, start, end);
  return filledColumns;
};
