export default function changePaginationColor(number) {
  let lists = document.getElementsByTagName("li");
  if (lists.length === 0) {
    return;
  }
  for (let index = 0; index < lists.length; index++) {
    lists[index].classList.remove("activePage");
  }
  lists[number - 1].classList.add("activePage");
}
