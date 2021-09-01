export enum Language {
  DE = "DE",
  EN = "EN"
}

export function stemm(lang: Language, word: string) {
  switch (lang) {
    case Language.DE:
      return stemmDE(word);
    case Language.EN:
      return stemmEN(word);
  }
}


/* by Joder Illi, Snowball mailing list */
function stemmDE(word: string) {
  /*
  Put u and y between vowels into upper case
  */
  word = word.replace(/([aeiouyäöü])u([aeiouyäöü])/g, '$1U$2');
  word = word.replace(/([aeiouyäöü])y([aeiouyäöü])/g, '$1Y$2');

  /*
  and then do the following mappings,
  (a) replace ß with ss,
  (a) replace ae with ä, Not doing these,
  have trouble with diphtongs
  (a) replace oe with ö, Not doing these,
  have trouble with diphtongs
  (a) replace ue with ü unless preceded by q. Not doing these,
  have trouble with diphtongs
  So in quelle, ue is not mapped to ü because it follows q, and in
  feuer it is not mapped because the first part of the rule changes it to
  feUer, so the u is not found.
  */
  word = word.replace(/ß/g, 'ss');
  //word = word.replace(/ae/g, 'ä');
  //word = word.replace(/oe/g, 'ö');
  //word = word.replace(/([^q])ue/g, '$1ü');

  /*
  R1 and R2 are first set up in the standard way (see the note on R1
  and R2), but then R1 is adjusted so that the region before it contains at
  least 3 letters.
  R1 is the region after the first non-vowel following a vowel, or is
  the null region at the end of the word if there is no such non-vowel.
  R2 is the region after the first non-vowel following a vowel in R1,
  or is the null region at the end of the word if there is no such non-vowel.
  */

  let r1Index = word.search(/[aeiouyäöü][^aeiouyäöü]/);
  let r1 = '';
  if (r1Index != -1) {
    r1Index += 2;
    r1 = word.substring(r1Index);
  }

  let r2Index = -1;
  let r2 = '';

  if (r1Index != -1) {
    r2Index = r1.search(/[aeiouyäöü][^aeiouyäöü]/);
    if (r2Index != -1) {
      r2Index += 2;
      r2 = r1.substring(r2Index);
      r2Index += r1Index;
    } else {
      r2 = '';
    }
  }

  if (r1Index != -1 && r1Index < 3) {
    r1Index = 3;
    r1 = word.substring(r1Index);
  }

  /*
  Define a valid s-ending as one of b, d, f, g, h, k, l, m, n, r or t.
  Define a valid st-ending as the same list, excluding letter r.
  */

  /*
  Do each of steps 1, 2 and 3.
  */

  /*
  Step 1:
  Search for the longest among the following suffixes,
  (a) em ern er
  (b) e en es
  (c) s (preceded by a valid s-ending)
  */
  const a1Index = word.search(/(em|ern|er)$/g);
  const b1Index = word.search(/(e|en|es)$/g);
  let c1Index = word.search(/([bdfghklmnrt]s)$/g);
  if (c1Index != -1) {
    c1Index++;
  }
  let index1 = 10000;
  let optionUsed1 = '';
  if (a1Index != -1 && a1Index < index1) {
    optionUsed1 = 'a';
    index1 = a1Index;
  }
  if (b1Index != -1 && b1Index < index1) {
    optionUsed1 = 'b';
    index1 = b1Index;
  }
  if (c1Index != -1 && c1Index < index1) {
    optionUsed1 = 'c';
    index1 = c1Index;
  }

  /*
  and delete if in R1. (Of course the letter of the valid s-ending is
  not necessarily in R1.) If an ending of group (b) is deleted, and the ending
  is preceded by niss, delete the final s.
  (For example, äckern -> äck, ackers -> acker, armes -> arm,
  bedürfnissen -> bedürfnis)
  */

  if (index1 != 10000 && r1Index != -1) {
    if (index1 >= r1Index) {
      word = word.substring(0, index1);
      if (optionUsed1 == 'b') {
        if (word.search(/niss$/) != -1) {
          word = word.substring(0, word.length - 1);
        }
      }
    }
  }
  /*
  Step 2:
  Search for the longest among the following suffixes,
  (a) en er est
  (b) st (preceded by a valid st-ending, itself preceded by at least 3
  letters)
  */

  const a2Index = word.search(/(en|er|est)$/g);
  let b2Index = word.search(/(.{3}[bdfghklmnt]st)$/g);
  if (b2Index != -1) {
    b2Index += 4;
  }

  let index2 = 10000;
  let optionUsed2 = '';
  if (a2Index != -1 && a2Index < index2) {
    optionUsed2 = 'a';
    index2 = a2Index;
  }
  if (b2Index != -1 && b2Index < index2) {
    optionUsed2 = 'b';
    index2 = b2Index;
  }

  /*
  and delete if in R1.
  (For example, derbsten -> derbst by step 1, and derbst -> derb by
  step 2, since b is a valid st-ending, and is preceded by just 3 letters)
  */

  if (index2 != 10000 && r1Index != -1) {
    if (index2 >= r1Index) {
      word = word.substring(0, index2);
    }
  }

  /*
  Step 3: d-suffixes (*)
  Search for the longest among the following suffixes, and perform the
  action indicated.
  end ung
  delete if in R2
  if preceded by ig, delete if in R2 and not preceded by e
  ig ik isch
  delete if in R2 and not preceded by e
  lich heit
  delete if in R2
  if preceded by er or en, delete if in R1
  keit
  delete if in R2
  if preceded by lich or ig, delete if in R2
  */

  const a3Index = word.search(/(end|ung)$/g);
  let b3Index = word.search(/[^e](ig|ik|isch)$/g);
  const c3Index = word.search(/(lich|heit)$/g);
  const d3Index = word.search(/(keit)$/g);
  if (b3Index != -1) {
    b3Index++;
  }

  let index3 = 10000;
  let optionUsed3 = '';
  if (a3Index != -1 && a3Index < index3) {
    optionUsed3 = 'a';
    index3 = a3Index;
  }
  if (b3Index != -1 && b3Index < index3) {
    optionUsed3 = 'b';
    index3 = b3Index;
  }
  if (c3Index != -1 && c3Index < index3) {
    optionUsed3 = 'c';
    index3 = c3Index;
  }
  if (d3Index != -1 && d3Index < index3) {
    optionUsed3 = 'd';
    index3 = d3Index;
  }

  if (index3 != 10000 && r2Index != -1) {
    if (index3 >= r2Index) {
      word = word.substring(0, index3);
      let optionIndex = -1;
      const optionSubsrt = '';
      if (optionUsed3 == 'a') {
        optionIndex = word.search(/[^e](ig)$/);
        if (optionIndex != -1) {
          optionIndex++;
          if (optionIndex >= r2Index) {
            word = word.substring(0, optionIndex);
          }
        }
      } else if (optionUsed3 == 'c') {
        optionIndex = word.search(/(er|en)$/);
        if (optionIndex != -1) {
          if (optionIndex >= r1Index) {
            word = word.substring(0, optionIndex);
          }
        }
      } else if (optionUsed3 == 'd') {
        optionIndex = word.search(/(lich|ig)$/);
        if (optionIndex != -1) {
          if (optionIndex >= r2Index) {
            word = word.substring(0, optionIndex);
          }
        }
      }
    }
  }

  /*
  Finally,
  turn U and Y back into lower case, and remove the umlaut accent from
  a, o and u.
  */
  word = word.replace(/U/g, 'u');
  word = word.replace(/Y/g, 'y');
  word = word.replace(/ä/g, 'a');
  word = word.replace(/ö/g, 'o');
  word = word.replace(/ü/g, 'u');

  return word;
}

// Porter stemmer in Javascript. Few comments, but it's easy to follow against the rules in the original
// paper, in
//
//  Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14,
//  no. 3, pp 130-137,
//
// see also http://www.tartarus.org/~martin/PorterStemmer

// Release 1 be 'andargor', Jul 2004
// Release 2 (substantially revised) by Christopher McKenzie, Aug 2009

function stemmEN(word: string) {
  let fp;
  const step2list = {
      "ational": "ate",
      "tional": "tion",
      "enci": "ence",
      "anci": "ance",
      "izer": "ize",
      "bli": "ble",
      "alli": "al",
      "entli": "ent",
      "eli": "e",
      "ousli": "ous",
      "ization": "ize",
      "ation": "ate",
      "ator": "ate",
      "alism": "al",
      "iveness": "ive",
      "fulness": "ful",
      "ousness": "ous",
      "aliti": "al",
      "iviti": "ive",
      "biliti": "ble",
      "logi": "log"
    },

    step3list = {
      "icate": "ic",
      "ative": "",
      "alize": "al",
      "iciti": "ic",
      "ical": "ic",
      "ful": "",
      "ness": ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  let stem,
    suffix,
    firstch,
    re,
    re2,
    re3,
    re4;
  const origword = word;

  if (word.length < 3) {
    return word;
  }

  // eslint-disable-next-line prefer-const
  firstch = word.substr(0, 1);
  if (firstch == "y") {
    word = firstch.toUpperCase() + word.substr(1);
  }

  // Step 1a
  re = /^(.+?)(ss|i)es$/;
  re2 = /^(.+?)([^s])s$/;

  if (re.test(word)) {
    word = word.replace(re, "$1$2");
  } else if (re2.test(word)) {
    word = word.replace(re2, "$1$2");
  }

  // Step 1b
  re = /^(.+?)eed$/;
  re2 = /^(.+?)(ed|ing)$/;
  if (re.test(word)) {
    fp = re.exec(word);
    re = new RegExp(mgr0);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (re.test(fp[1])) {
      re = /.$/;
      word = word.replace(re, "");
    }
  } else if (re2.test(word)) {
    fp = re2.exec(word);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stem = fp[1];
    re2 = new RegExp(s_v);
    if (re2.test(stem)) {
      word = stem;
      re2 = /(at|bl|iz)$/;
      re3 = new RegExp("([^aeiouylsz])\\1$");
      re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (re2.test(word)) {
        word = word + "e";
      } else if (re3.test(word)) {
        re = /.$/;
        word = word.replace(re, "");
      } else if (re4.test(word)) {
        word = word + "e";
      }
    }
  }

  // Step 1c
  re = /^(.+?)y$/;
  if (re.test(word)) {
    fp = re.exec(word);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stem = fp[1];
    re = new RegExp(s_v);
    if (re.test(stem)) {
      word = stem + "i";
    }
  }

  // Step 2
  re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
  if (re.test(word)) {
    fp = re.exec(word);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stem = fp[1];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    suffix = fp[2];
    re = new RegExp(mgr0);
    if (re.test(stem)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      word = stem + step2list[suffix];
    }
  }

  // Step 3
  re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
  if (re.test(word)) {
    fp = re.exec(word);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stem = fp[1];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    suffix = fp[2];
    re = new RegExp(mgr0);
    if (re.test(stem)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      word = stem + step3list[suffix];
    }
  }

  // Step 4
  re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  re2 = /^(.+?)(s|t)(ion)$/;
  if (re.test(word)) {
    fp = re.exec(word);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stem = fp[1];
    re = new RegExp(mgr1);
    if (re.test(stem)) {
      word = stem;
    }
  } else if (re2.test(word)) {
    fp = re2.exec(word);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stem = fp[1] + fp[2];
    re2 = new RegExp(mgr1);
    if (re2.test(stem)) {
      word = stem;
    }
  }

  // Step 5
  re = /^(.+?)e$/;
  if (re.test(word)) {
    fp = re.exec(word);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stem = fp[1];
    re = new RegExp(mgr1);
    re2 = new RegExp(meq1);
    re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
    if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
      word = stem;
    }
  }

  re = /ll$/;
  re2 = new RegExp(mgr1);
  if (re.test(word) && re2.test(word)) {
    re = /.$/;
    word = word.replace(re, "");
  }

  // and turn initial Y back to y

  if (firstch == "y") {
    word = firstch.toLowerCase() + word.substr(1);
  }

  return word;
};
