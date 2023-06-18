import React, { useState, useMemo, useEffect } from 'react';

function YearList({ initialYear = 2018, selectedYear: propSelectedYear, onSelect }) {
  const [page, setPage] = useState(0); // 当前页数
  const [selectedYear, setSelectedYear] = useState(2230); // 选中的年份
  const [years, setYears] = useState(() => {
    return Array.from({ length: 10 }, (_, index) => initialYear + index);
  }); // 生成年份列表

  // 根据选中的年份计算页数
  useEffect(() => {
    const index = years.findIndex((year) => year === propSelectedYear);
    if (index !== -1) {
      setPage(Math.floor(index / 10));
    }
  }, [propSelectedYear, years]);

  // 获取当前页的年份列表
  const getCurrentPageYears = () => {
    const start = page * 10;
    const end = start + 10;
    return years.slice(start, end);
  };

  // 点击上一页按钮
  const handlePrevPage = () => {
    setPage(page - 1);
  };

  // 点击下一页按钮
  const handleNextPage = () => {
    setPage(page + 1);
    const newYears = Array.from({ length: 10 }, (_, index) => initialYear + (page + 1) * 10 + index);
    setYears([...years, ...newYears]);
  };

  // 点击年份
  const handleYearClick = (year) => {
    setSelectedYear(year);
    onSelect && onSelect(year);
  };

  // 渲染年份列表
  const renderYearList = () => {
    return getCurrentPageYears().map((year) => (
      <div 
        key={year}
        style={{
          textAlign: 'center',
          backgroundColor: selectedYear === year ? 'yellow' : 'white' }}
          onClick={() => handleYearClick(year)}
        >
        {year}
      </div>
    ));
  };

  return (
    <div style={{ display: 'grid', gridTemplateRows: `repeat(${Math.ceil(10 / 2)}, 1fr)`, gap: '10px' }}>
      {renderYearList()}
      <div onClick={handlePrevPage} style={{ textAlign: 'center', cursor: page === 0 ? 'not-allowed' : 'pointer', pointerEvents: page === 0 ? 'none' : 'auto', opacity: page === 0 ? 0.5 : 1 }}>
        上一页
      </div>
      <div onClick={handleNextPage} style={{ textAlign: 'center', cursor: 'pointer' }}>
        下一页
      </div>
      {selectedYear && <div style={{ textAlign: 'center' }}>你选择了 {selectedYear} 年</div>}
    </div>
  );
}

export default YearList;
