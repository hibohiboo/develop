const mm = m%60;
const hh = Math.floor(mm/60);
const z = (num)=>{
  const s = "00" + String(num);
  return s.substr(s.length-2, 2);
}