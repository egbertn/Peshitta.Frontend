import { isNumber } from "util";

export
class Group<T, KEY> {
  key:KEY;
  members:T[] = [];
  constructor(key:KEY) {
      this.key = key;
  }
}
   /**
     * @param list  Array to be grouped. 
     * @param the key that is used to group on
     */
export
function groupBy<T, KEY>(list:T[], func:(x:T)=>KEY): Group<T, KEY>[] {
  let res:Group<T, KEY>[] = [];
  let group:Group<T, KEY> = null;

  if (list.every(f => typeof func(f) === 'number'))
  {
    list.sort((a, b)=> Number.parseInt(func(a).toString()) - Number.parseInt(func(b).toString()));
  }
  else
  {
    list.sort((a, b)=> func(a) > func(b) ? 1 : 
                      (func(a) < func(b) ? -1 : 0 )
                      );
  }
  list.forEach((o)=>{
      let groupName = func(o);
      if (group === null) {
          group = new Group<T, KEY>(groupName);
      }
      if (groupName != group.key) {
          res.push(group);
          group = new Group<T, KEY>(groupName);
      }
      group.members.push(o)
  });
  if (group != null) {
      res.push(group);
  }
  return res
}
export function distinct<T, KEY>(list:T[], func:(x:T)=>KEY): T[] {
  const map = new Map<KEY, T>();
 
  list.forEach(o=>{
    let groupName = func(o);
    if (!map.has(groupName)) {
      map.set(groupName, o);
    }
  });
  return Array.from( map.values());
}
