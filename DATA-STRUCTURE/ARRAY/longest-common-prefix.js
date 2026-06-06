var longestCommonPrefix = function(strs) {
    if (!strs.length) return "";

    // sort — first and last will be most different
    strs.sort();

    const first = strs[0];
    const last  = strs[strs.length - 1];

    let i = 0;
    while (i < first.length && first[i] === last[i]) {
        i++;
    }

    return first.slice(0, i);
};