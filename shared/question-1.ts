const arr = [3, 1, 2, 5, 8, 7, 6];


/**
 * 1. middle of array -> pivot (5)
 * 2. element of index: 0, 1 -> compare to pivot.
 * [3, 1, 2] index 0 - 2
 * 	- pivot (1)
 * 	- [3] [2]
 * 	- smaller
 * 	- pivot -> [1]
 * 	- larger -> [3, 2]
 *  - merging (smaller & larger)
 *  	- []
 * [8, 7, 6] index 4 - 6
 *
 *
 * */

/*
* 0. min = 1, max = 8
* 1. looping of index, index + 1 (index + 1 <= arr.length)
*  - a = index (3)
*  - b = index + 1 (1)
*  - tmpB = arr[a] (3)
*  - arr[a] = arr[b] (1) -> updated a
*  - arr[b] = tmpB (3) -> updated b
*
* [1, 3, 2]
*  - a = index (3)
*  - b = index + 1 (2)
*
* [1, 2, 3, 5, 8, 7, 6] (i = 8, i + 1 = 7)
*  -
*
* [1, 2, 3, 5, 7, 6, 8]
*  -
* */

