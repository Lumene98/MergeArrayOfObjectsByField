//@flow

export default function merge(
  array: Array<Object> /* this is the Array of Objects you want to divide */,
  key: string /* this is the key of the object you want to base on for dividing */,
  unify?: string /* if you specify this field it is gonna return a single Array with the Objects merged instead of an Array of Objects */
) {
  const grouped: {
    [key: string]: Array<Object>
  } = groupBy(array, key);

  const updatedArray: Array<Array<Object> | any> = Object.values(
    grouped
  ); /* here we get only the values of the Object because we just need the divide Arrays */

  return unify && 
    ? updatedArray.map<Array<Array<Object>>>(( /* here we merge the Array of Objects into a single Object using the unify parameter */
        el 
      ) =>
        el.length > 1
          ? {
              ...el[0],
              [unify]: el.reduce(
                (arr, obj) =>
                  Array.isArray(obj[unify])
                    ? [...arr, ...obj[unify]]
                    : [...arr, obj[unify]],
                []
              )
            }
          : el[0]
      )
    : updatedArray;
}

/* 
    
    This function will simply convert our array into an object with  the value of the key specified as key and an array of objects, 
    that include the key we specified before, from the array
    
    EX: console.log(groupBy(['one', 'two', 'three'], 'length')); => {3: ["one", "two"], 5: ["three"]}
    
    Credits to: 
    https://gist.github.com/robmathers
    More detailed function: 
    https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d
    
*/
const groupBy = (rx: Array<Object>, key: string) =>
  rx.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
