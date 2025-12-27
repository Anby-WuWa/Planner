 let selectedWeapon = '';
 let selectedCharacter = '';
 
 characters.sort((a, b) => {
  // First, sort by rank (ascending)
  if (a.rank !== b.rank) {
    return a.rank - b.rank;
  }
  // If ranks are equal, sort alphabetically by name
  return a.name.localeCompare(b.name);
});		

weapons.sort((a, b) => {
  // First, sort by 'sort' (ascending)
  if (a.sort !== b.sort) {
    return a.sort - b.sort;
  }

  // Then by 'rank' (ascending)
  if (a.rank !== b.rank) {
    return b.rank - a.rank;
  }

  // Finally, by 'name' (alphabetical)
  return a.name.localeCompare(b.name);
});					

const expTable = {
  1: 400, 2: 400, 3: 500, 4: 600, 5: 700, 6: 900, 7: 1000, 8: 1200, 9: 1300,
  10: 1500, 11: 1700, 12: 2000, 13: 2200, 14: 2400, 15: 2700, 16: 3000, 17: 3300,
  18: 3600, 19: 3900, 20: 4300, 21: 4600, 22: 5000, 23: 5400, 24: 5800, 25: 6300,
  26: 6700, 27: 7200, 28: 7700, 29: 8200, 30: 8700, 31: 9300, 32: 9800, 33: 10400,
  34: 11000, 35: 11700, 36: 12300, 37: 13000, 38: 13700, 39: 14400, 40: 15100,
  41: 15900, 42: 16700, 43: 17500, 44: 18300, 45: 19200, 46: 20000, 47: 20900,
  48: 21900, 49: 22800, 50: 23800, 51: 24800, 52: 25800, 53: 26900, 54: 28000,
  55: 29100, 56: 30300, 57: 31400, 58: 32600, 59: 33900, 60: 35100, 61: 36400,
  62: 37700, 63: 39100, 64: 40500, 65: 41900, 66: 43300, 67: 44800, 68: 46300,
  69: 47900, 70: 49500, 71: 51100, 72: 52800, 73: 54500, 74: 56200, 75: 58000,
  76: 59800, 77: 61600, 78: 63500, 79: 65400, 80: 67400, 81: 69400, 82: 71400,
  83: 73500, 84: 75600, 85: 77800, 86: 80000, 87: 82300, 88: 84600, 89: 86900
};

const weaponExpTables = {
5:[	600,	700,	800,	900,	1000,	1100,	1300,	1400,	1600,	1800,	2000,	2200,	2500,	2700,	3000,	3300,	3600,	3900,	4300,	4600,	5000,	5400,	5800,	6300,	6700,	7200,	7700,	8200,	8700,	9300,	9900,	10500,	11100,	11800,	12400,	13100,	13800,	14600,	15300,	16100,	16900,	17700,	18600,	19400,	20300,	21300,	22200,	23200,	24200,	25200,	26300,	27300,	28400,	29600,	30700,	31900,	33100,	34300,	35600,	36900,	38200,	39600,	41000,	42400,	43800,	45300,	46800,	48300,	49800,	51400,	53000,	54700,	56400,	58100,	59800,	61600,	63400,	65200,	67100,	71600,	73900,	76900,	80600,	85300,	91400,	99000,	108400,	120000,	134100	],
4:[	400,	500,	700,	800,	1000,	1100,	1300,	1500,	1600,	1800,	2000,	2200,	2400,	2700,	2900,	3100,	3400,	3600,	3900,	4200,	4400,	4700,	5000,	5400,	5700,	6000,	6400,	6700,	7100,	7500,	7900,	8300,	8800,	9200,	9700,	10200,	10700,	11200,	11700,	12300,	12800,	13400,	14000,	14700,	15300,	16000,	16700,	17400,	18200,	18900,	19700,	20500,	21400,	22200,	23100,	24100,	25000,	26000,	27000,	28100,	29200,	30300,	31400,	32600,	33800,	35100,	36400,	37700,	39000,	40500,	41900,	43400,	44900,	46500,	48100,	49800,	51500,	53200,	55000,	60500,	63200,	67000,	72100,	78700,	87200,	97900,	111400,	128000,	148400	],
3:[	240,	300,	420,	480,	600,	660,	780,	900,	960,	1080,	1200,	1320,	1440,	1620,	1740,	1860,	2040,	2160,	2340,	2520,	2640,	2820,	3000,	3240,	3420,	3600,	3840,	4020,	4260,	4500,	4740,	4980,	5280,	5520,	5820,	6120,	6420,	6720,	7020,	7380,	7680,	8040,	8400,	8820,	9180,	9600,	10020,	10440,	10920,	11340,	11820,	12300,	12840,	13320,	13860,	14460,	15000,	15600,	16200,	16860,	17520,	18180,	18840,	19560,	20280,	21060,	21840,	22620,	23400,	24300,	25140,	26040,	26940,	27900,	28860,	29880,	30900,	31920,	33000,	36300,	37920,	40200,	43260,	47220,	52320,	58740,	66840,	76800,	89040	],
2:[	200,	250,	350,	400,	500,	550,	650,	750,	800,	900,	1000,	1100,	1200,	1350,	1450,	1550,	1700,	1800,	1950,	2100,	2200,	2350,	2500,	2700,	2850,	3000,	3200,	3350,	3550,	3750,	3950,	4150,	4400,	4600,	4850,	5100,	5350,	5600,	5850,	6150,	6400,	6700,	7000,	7350,	7650,	8000,	8350,	8700,	9100,	9450,	9850,	10250,	10700,	11100,	11550,	12050,	12500,	13000,	13500,	14050,	14600,	15150,	15700,	16300,	16900,	17550,	18200,	18850,	19500,	20250,	20950,	21700,	22450,	23250,	24050,	24900,	25750,	26600,	27500,	30250,	31600,	33500,	36050,	39350,	43600,	48950,	55700,	64000,	74200	],
1:[	160,	200,	280,	320,	400,	440,	520,	600,	640,	720,	800,	880,	960,	1080,	1160,	1240,	1360,	1440,	1560,	1680,	1760,	1880,	2000,	2160,	2280,	2400,	2560,	2680,	2840,	3000,	3160,	3320,	3520,	3680,	3880,	4080,	4280,	4480,	4680,	4920,	5120,	5360,	5600,	5880,	6120,	6400,	6680,	6960,	7280,	7560,	7880,	8200,	8560,	8880,	9240,	9640,	10000,	10400,	10800,	11240,	11680,	12120,	12560,	13040,	13520,	14040,	14560,	15080,	15600,	16200,	16760,	17360,	17960,	18600,	19240,	19920,	20600,	21280,	22000,	24200,	25280,	26800,	28840,	31480,	34880,	39160,	44560,	51200,	59360	]
};


function projectBestExpCombo(currentLevel, desiredLevel, isWeapon = false, rank = 3) {
  const expValues = isWeapon
    ? { expW1: 1000, expW2: 3000, expW3: 8000, expW4: 20000 }
    : { exp1: 1000, exp2: 3000, exp3: 8000, exp4: 20000 };

  const requiredExp = isWeapon
    ? calculateWeaponRequiredExp(levelToNumber(currentLevel), levelToNumber(desiredLevel), rank)
    : calculateRequiredExp(levelToNumber(currentLevel), levelToNumber(desiredLevel));

  let remaining = requiredExp;
  const allocation = {};

  // ✅ Use LOWEST value EXP items first
  const entriesAsc = Object.entries(expValues).sort((a, b) => a[1] - b[1]);

  for (const [item, value] of entriesAsc) {
    const used = Math.floor(remaining / value);
    if (used > 0) {
      allocation[item] = used;
      remaining -= used * value;
    }
  }

  // Top up with ONE smallest item if any remainder
  if (remaining > 0) {
    const [smallestItem] = entriesAsc[0];
    allocation[smallestItem] = (allocation[smallestItem] ?? 0) + 1;
  }

  return allocation;
}

function calculateRequiredExp(currentLevel, desiredLevel) {
  let totalExp = 0;
  for (let lvl = currentLevel; lvl < desiredLevel; lvl++) {
    totalExp += expTable[lvl] ?? 0;
  }
  return totalExp;
}

function calculateWeaponRequiredExp(currentLevel, desiredLevel, rank) {
  const table = weaponExpTables[rank];
  if (!table) return 0;
  let totalExp = 0;
  for (let lvl = levelToNumber(currentLevel); lvl < levelToNumber(desiredLevel); lvl++) {
    totalExp += table[lvl - 1] ?? 0;
  }
  return totalExp;
}


function calculateExpItemCost(expAllocated) {
  const expItemCosts = {
    exp1: 350,
    exp2: 1050,
    exp3: 2800,
    exp4: 7000
  };
  let totalCost = 0;
  for (const [item, qty] of Object.entries(expAllocated)) {
    totalCost += (expItemCosts[item] ?? 0) * qty;
  }
  return totalCost;
}

function calculateWeaponExpItemCost(expAllocated) {
  const expItemCosts = {
    expW1: 400,
    expW2: 1200,
    expW3: 3200,
    expW4: 8000
  };

  let totalCost = 0;
  for (const [item, qty] of Object.entries(expAllocated)) {
    totalCost += (expItemCosts[item] ?? 0) * qty;
  }
  return totalCost;
}

function allocateExpByPriority(characters, inventory) {
  const expValuesBase = {
    exp1: 1000, exp2: 3000, exp3: 8000, exp4: 20000,
    expW1: 1000, expW2: 3000, expW3: 8000, expW4: 20000
  };

  const expInventory = Object.keys(expValuesBase).reduce((acc, item) => {
    acc[item] = inventory[item] ?? 0;
    return acc;
  }, {});

  const allocations = {};

  for (const char of characters) {
    const jsid = getJsidFromName(char.name);
    const isWeapon = weapons.some(w => w.jsid === jsid);
    const weapon = weapons.find(w => w.jsid === jsid);
    const rank = isWeapon ? (weapon?.rank ?? 3) : (itemMetadata[char.name]?.rank ?? 3);

    const expValues = isWeapon
      ? { expW1: 1000, expW2: 3000, expW3: 8000, expW4: 20000 }
      : { exp1: 1000, exp2: 3000, exp3: 8000, exp4: 20000 };

    const expItems = Object.keys(expValues);

    const requiredExp = isWeapon
      ? calculateWeaponRequiredExp(levelToNumber(char.currentLevel), levelToNumber(char.desiredLevel), rank)
      : calculateRequiredExp(levelToNumber(char.currentLevel), levelToNumber(char.desiredLevel));

    // --- begin new lowest->highest greedy allocation block ---
const allocation = {};
let remainingExp = requiredExp;

// LOWEST to HIGHEST by value
const itemsAsc = Object.keys(expValues).sort((a, b) => expValues[a] - expValues[b]);

// Use as many of the smallest items as possible, then move up
for (const item of itemsAsc) {
  const value = expValues[item];
  const available = expInventory[item] ?? 0;
  if (available <= 0 || remainingExp <= 0) continue;

  const needed = Math.floor(remainingExp / value);
  const used = Math.min(needed, available);

  if (used > 0) {
    allocation[item] = used;
    expInventory[item] -= used;        // consume shared inventory
    remainingExp -= used * value;
  }
}

// If a little remainder remains, try to top up with ONE smallest available item
if (remainingExp > 0) {
  for (const item of itemsAsc) {
    if ((expInventory[item] ?? 0) > 0) {
      allocation[item] = (allocation[item] ?? 0) + 1;
      expInventory[item] -= 1;
      remainingExp = 0;
      break;
    }
  }
}

const shortfall = Math.max(0, remainingExp);

allocations[char.uniqueId] = {
  expAllocated: allocation,
  expShortfall: shortfall
};
// --- end new lowest->highest greedy allocation block ---
  }

  return allocations;
}



function levelToNumber(level) {
  return typeof level === 'string' && level.includes('*') ? parseInt(level) + 0.5 : parseInt(level);
}

function formatNumberShort(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
} 

function getJsidFromName(name) {
  const character = characters.find(c => c.name === name);
  if (character?.jsid) return character.jsid;
  const weapon = weapons.find(w => w.name === name);
  return weapon?.jsid ?? null;
}


function calculateRequiredItems(characterName, currentLevel, desiredLevel) {
  const jsid = getJsidFromName(characterName);
  if (!jsid) return {};

  // Try character requirements first, then weapon requirements
  const rules = levelRequirements[jsid] || levelWRequirements[jsid];
  if (!rules) return {};

  const current = levelToNumber(currentLevel);
  const desired = levelToNumber(desiredLevel);
  const totalItems = {};

  for (const rule of rules) {
    const min = levelToNumber(rule.min);
    const max = levelToNumber(rule.max);
    if (desired >= min && current < min) {
      for (const [item, qty] of Object.entries(rule.items)) {
        totalItems[item] = (totalItems[item] || 0) + qty;
      }
    }
  }

  return totalItems;
}


function calculateSkillItems(characterName, skills) {
  const jsid = getJsidFromName(characterName);
  if (!jsid) return {};

  const totalItems = {};

  for (const skill of skills) {
    const current = parseInt(skill.current);
    const desired = parseInt(skill.desired);
    let rules;

    if (skill.name.startsWith('stat')) {
      rules = statRequirements[jsid];
    } else if (skill.name === 'inherent') {
      rules = inherentRequirements[jsid];
    } else {
      rules = skillRequirements[jsid];
    }

    if (!rules) continue;

    for (const rule of rules) {
      if (rule.from >= current && rule.to <= desired) {
        for (const [item, qty] of Object.entries(rule.items)) {
          totalItems[item] = (totalItems[item] ?? 0) + qty;
        }
      }
    }
  }

  return totalItems;
}

function processCharactersByPriority(characters, inventory, itemMetadata) {
  const reservedInventory = {};
  const results = {};
  const groupMap = buildGroupMap(itemMetadata);

  characters.sort((a, b) => a.priority - b.priority);

  const expAllocations = allocateExpByPriority(characters, inventory);
								 

  let availableShellCredit = inventory["Shell Credits"] ?? 0;

  for (const char of characters) {
    const { name, currentLevel, desiredLevel, skills } = char;
    const levelItems = calculateRequiredItems(name, currentLevel, desiredLevel);
    const skillItems = calculateSkillItems(name, skills);
    const totalItems = { ...levelItems };

    for (const [item, qty] of Object.entries(skillItems)) {
      totalItems[item] = (totalItems[item] ?? 0) + qty;
    }


    const jsid = getJsidFromName(char.name);
    const isWeapon = weapons.some(w => w.jsid === jsid);
    const weapon = weapons.find(w => w.jsid === jsid);
    const rank = isWeapon ? (weapon?.rank ?? 3) : (itemMetadata[char.name]?.rank ?? 3);

    const requiredExpItem = projectBestExpCombo(
      levelToNumber(char.currentLevel),
      levelToNumber(char.desiredLevel),
      isWeapon,
      rank
    );

  const expCreditCost = isWeapon
  ? calculateWeaponExpItemCost(requiredExpItem)
  : calculateExpItemCost(requiredExpItem);

    const itemCreditCost = totalItems["Shell Credits"] ?? 0;
    const totalCreditCost = itemCreditCost + expCreditCost;

    const reserved = reserveRequiredItems(totalItems, inventory);

    // Reserve Shell Credit by priority
    const reservedShellCredit = Math.min(totalCreditCost, availableShellCredit);
    availableShellCredit -= reservedShellCredit;
    reserved["Shell Credits"] = reservedShellCredit;

    const inventoryClone = structuredClone(inventory);
    const cappedCrafted = getCraftedItemsFromInventory(totalItems, inventoryClone, itemMetadata);
    const { craftedItems, usedInventory } = craftingPath(cappedCrafted, totalItems, inventoryClone, itemMetadata);
	

    // Compute adjusted unmet items
    const adjusted = {};
    for (const item in totalItems) {
      const required = totalItems[item];
      const used = reserved[item] ?? 0;
      const unmet = Math.max(0, required - used);
      if (unmet > 0) adjusted[item] = unmet;
    }

    // Handle unmet Shell Credit
    const unmetShellCredit = totalCreditCost - reserved["Shell Credits"];
    if (unmetShellCredit > 0) {
      adjusted["Shell Credits"] = unmetShellCredit;
    }

    // Reserve all lower-ranked items in a group if the highest-ranked item is unmet
    const highestUnmetByGroup = {};
    for (const [item, unmetQty] of Object.entries(adjusted)) {
      const meta = itemMetadata[item];
      if (!meta) continue;
      const { group, rank } = meta;
      if (!highestUnmetByGroup[group] || rank > highestUnmetByGroup[group].rank) {
        highestUnmetByGroup[group] = { item, rank };
      }
    }

							 
    for (const [group, { item: highestItem, rank: highestRank }] of Object.entries(highestUnmetByGroup)) {
      const rankedItems = groupMap[group] ?? [];
      const reservedQty = reserved[highestItem] ?? 0;
      const craftedQty = craftedItems[highestItem] ?? 0;
      const requiredQty = totalItems[highestItem] ?? 0;
      const unmetQty = Math.max(0, requiredQty - reservedQty - craftedQty);
      if (unmetQty > 0) {
        for (let r = 1; r < highestRank; r++) {
          const lowerItem = rankedItems[r];
          if (!lowerItem) continue;
          const availableLower = inventory[lowerItem] ?? 0;
          if (availableLower > 0) {
            reservedInventory[lowerItem] = (reservedInventory[lowerItem] ?? 0) + availableLower;
            inventory[lowerItem] = 0;
          }
        }
      }
    }

    // Deduct reserved and used items from the main inventory
      for (const [item, qty] of Object.entries(reserved)) {
        inventory[item] = Math.max(0, (inventory[item] ?? 0) - qty);
      }
      for (const [item, qty] of Object.entries(usedInventory)) {
        inventory[item] = Math.max(0, (inventory[item] ?? 0) - qty);
      }


    results[char.uniqueId] = {
      adjusted,
					
      reserved,
      totalItems,
				   
      cappedCrafted,
      expAllocated: expAllocations[char.uniqueId]?.expAllocated ?? {},
      expShortfall: expAllocations[char.uniqueId]?.expShortfall ?? 0,
      isWeapon
    };
  }

  return results;
}



function getCharacterDataFromUI() {
  const cards = document.querySelectorAll('.character-card');
  const characters = [];

  cards.forEach(card => {
    const name = card.querySelector('.character-name').textContent;
    const uniqueId = card.getAttribute('id');
    const priority = parseInt(card.dataset.priority);
    const isOff = card.classList.contains('off');
    const paragraphs = card.querySelectorAll('p');

    // Extract level using label-based matching
    let currentLevel = '1';
    let desiredLevel = '1';
    paragraphs.forEach(p => {
      const levelMatch = p.textContent.match(/Level:\s*(\d+\*?)\s*→\s*(\d+\*?)/);
      if (levelMatch) {
        currentLevel = levelMatch[1];
        desiredLevel = levelMatch[2];
      }
    });

    const jsid = getJsidFromName(name);
    const isWeapon = weapons.some(w => w.jsid === jsid);

    let skills = [];

    if (!isWeapon) {
      const skillLabels = ['Stat 1', 'Stat 2', 'Stat 3', 'Stat 4', 'Inherent', 'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'];
      const skillMap = {};

      paragraphs.forEach(p => {
        const match = p.textContent.match(/^(Stat \d|Inherent|Skill \d):\s*(\d+)\s*→\s*(\d+)/);
        if (match) {
          const [_, label, current, desired] = match;
          const idPrefix = label.toLowerCase().replace(' ', '');
          skillMap[idPrefix] = { name: idPrefix, current, desired };
        }
      });

      skills = skillLabels.map(label => {
        const id = label.toLowerCase().replace(' ', '');
        return skillMap[id] || { name: id, current: '0', desired: '0' };
      });
    }

    characters.push({ name, uniqueId, priority, currentLevel, desiredLevel, skills, isOff });
  });

  return characters;
}

function updateAllCardsWithPriorityLogic() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) return;

  const inventory = JSON.parse(localStorage.getItem(`inventoryQuantities_${username}`) ?? '{}');
  const characters = getCharacterDataFromUI();
  

// Map JSIDs and weapon status for each character
const jsidMap = Object.fromEntries(characters.map(c => [c.name, getJsidFromName(c.name)]));
const isWeaponMap = Object.fromEntries(characters.map(c => [c.name, weapons.some(w => w.jsid === jsidMap[c.name])]));


  // Filter only active characters for calculations
  const activeCharacters = characters.filter(c => !c.isOff);
  const results = processCharactersByPriority(activeCharacters, inventory, itemMetadata);


  characters.forEach(char => {
  const card = document.getElementById(char.uniqueId);
  const isOff = char.isOff;

  console.log(`Card for ${char.name} is ${isOff ? 'OFF' : 'ON'}`);

let result = results[char.uniqueId];
if (!result && char.isOff) {
  const levelItems = calculateRequiredItems(char.name, char.currentLevel, char.desiredLevel);
  const skillItems = isWeaponMap[char.uniqueId] ? {} : calculateSkillItems(char.name, char.skills);
  const totalItems = { ...levelItems };
  for (const [item, qty] of Object.entries(skillItems)) {
    totalItems[item] = (totalItems[item] ?? 0) + qty;
  }
result = {
    reserved: {},
					  
    adjusted: {},
    cappedCrafted: {},					
    totalItems
  };
} else if (!result) {
  return;
}
  const { totalItems, cappedCrafted, adjusted, reserved} = result;

																								

  let requiredItemsHTML = '<div class="required-items" style="text-align: center; padding: 5px 10px;">';
  requiredItemsHTML += '<ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; justify-content: center;">';

  const sortedItems = Object.entries(totalItems).sort(([a], [b]) => {
    const metaA = itemMetadata[a] ?? {};
    const metaB = itemMetadata[b] ?? {};
    if (metaA.group === metaB.group) {
      return (metaA.rank ?? 0) - (metaB.rank ?? 0);
    }
    return (metaA.group ?? '').localeCompare(metaB.group ?? '');
  });


const jsid = getJsidFromName(char.name);
const isWeapon = weapons.some(w => w.jsid === jsid);
const weapon = weapons.find(w => w.jsid === jsid);
const rank = isWeapon ? (weapon?.rank ?? 3) : (itemMetadata[char.name]?.rank ?? 3);

const expAllocated = result.expAllocated ?? {};

const expValues = isWeapon
  ? { expW1: 1000, expW2: 3000, expW3: 8000, expW4: 20000 }
  : { exp1: 1000, exp2: 3000, exp3: 8000, exp4: 20000 };
let metExp = 0;

for (const [item, qty] of Object.entries(expAllocated)) {
  metExp += (expValues[item] ?? 0) * qty;
}

const requiredExp = isWeapon
  ? calculateWeaponRequiredExp(
      levelToNumber(char.currentLevel),
      levelToNumber(char.desiredLevel),
      rank
    )
  : calculateRequiredExp(
      levelToNumber(char.currentLevel),
      levelToNumber(char.desiredLevel)
    );


console.log({ isOff, metExp, requiredExp });

const requiredExpItem = projectBestExpCombo(
  levelToNumber(char.currentLevel),
  levelToNumber(char.desiredLevel),
  isWeapon,
  rank
);

metExp = Math.min(metExp, requiredExp);

if (requiredExp > 0) {
  const expGroup = isWeapon ? 'ac' : 'ab';
  const expIcon = isWeapon ? './ww_icons/general/Premium_Energy_Core.png' : './ww_icons/general/premium_resonance_potion.webp'; // You can dynamically pick based on rank if needed

    const bgStyle = `border-bottom: 2px solid #e8d254; background-image: linear-gradient( #e8d25403 50%, #e8d25440 ); padding: 3px; border-radius: 6px;${(!isOff && metExp >= requiredExp) ? ' filter: brightness(50%);' : ''}`;
    const displayMetQty = isOff ? 0 : metExp;
    const imageStyle = `width: 55px; height: 55px;${(!isOff && metExp >= requiredExp) ? ' filter: brightness(70%);' : ''}`;
				 

    requiredItemsHTML += `
    <li style="display: inline-block; width: 65px; text-align: center; margin: 5px;"  onclick="openGroupModal('${expGroup}')">
      <div class="mobile-text" style="font-size: 12px; background-color: black;">  ${formatNumberShort(displayMetQty)} <span style="font-weight: bold;">/</span> ${formatNumberShort(requiredExp)}</div>
        <div style="position: relative; display: inline-block; ${bgStyle}">
        <img src="${expIcon}" alt="EXP" style="${imageStyle}">
      </div>			
    </li>`;

}

const expCreditCost = isWeapon
  ? calculateWeaponExpItemCost(requiredExpItem)
  : calculateExpItemCost(requiredExpItem);
  
const creditCost = totalItems["Shell Credits"] ?? 0;
const totalShellCreditRequired = expCreditCost + creditCost;

if (totalShellCreditRequired > 0) {
  const metQty = reserved["Shell Credits"] ?? 0;
  const meta = itemMetadata["Shell Credits"];
  const iconPath = meta?.image ?? '';
    const rankColors = {
    0: '#acacac',
    1: '#5cc35e',
    2: '#59b4d3',
    3: '#ca6dff',
    4: '#e8d254'
      };
  const baseColor = rankColors[meta?.rank] ?? '#eee';
   const bgStyle = `border-bottom: 2px solid${baseColor}; background-image: linear-gradient(${baseColor}03 50%, ${baseColor}40 ); padding: 3px; border-radius: 6px;${(!isOff && metQty >= totalShellCreditRequired) ? ' filter: brightness(50%);' : ''}`;

  const displayMetQty = isOff ? 0 : metQty;
  const imageStyle = `width: 55px; height: 55px;${(!isOff && metQty >= totalShellCreditRequired) ? ' filter: brightness(70%);' : ''}`;

    requiredItemsHTML += `
    <li style="display: inline-block; width: 65px; text-align: center; margin: 5px; "onclick="openGroupModal('${meta.group}')">
      <div class="mobile-text" style="font-size: 12px; background-color: black;">  ${formatNumberShort(displayMetQty)} <span style="font-weight: bold;">/</span> ${formatNumberShort(totalShellCreditRequired)}</div>
        <div style="position: relative; display: inline-block; ${bgStyle}">
        <img src="${iconPath}" alt="Shell Credit"  style="${imageStyle}">
      </div>
    </li>`;
}


  for (const [item, requiredQty] of sortedItems) {
    if (item === "Shell Credits" ) continue;
   
    const unmetQty = adjusted[item] ?? 0;
    const met = requiredQty - unmetQty;
    const craftedUsed = cappedCrafted[item] ?? 0;
																			 
    const metQty = met + craftedUsed;
    const meta = itemMetadata[item];
    const iconPath = meta?.image ?? '';
    const rankColors = {
    0: '#acacac',
    1: '#5cc35e',
    2: '#59b4d3',
    3: '#ca6dff',
    4: '#e8d254'
      };

    const baseColor = rankColors[meta?.rank] ?? '#eee';
    const bgStyle = `border-bottom: 2px solid${baseColor}; background-image: linear-gradient(${baseColor}03 50%, ${baseColor}40 ); padding: 3px; border-radius: 6px;${(!isOff && metQty >= requiredQty) ? ' filter: brightness(50%);' : ''}`;

    const displayMetQty = isOff ? 0 : metQty;
    const displayCraftedNote = (!isOff && craftedUsed > 0)
      ? `<div class="mobile-text" style="position: absolute; bottom: 0; left: 0; background: rgba(0,0,0,0.6); color: white; font-size: 10px; padding: 1px 3px; border-radius: 3px;">${craftedUsed}</div>`
      : '';
    const imageStyle = `width: 55px; height: 55px;${(!isOff && metQty >= requiredQty) ? ' filter: brightness(70%);' : ''}`;

    requiredItemsHTML += `
    <li style="display: inline-block; width: 65px; text-align: center; margin: 5px;" onclick="openGroupModal('${meta.group}')">
      <div class="mobile-text" style="font-size: 12px; background-color: black;">  ${formatNumberShort(displayMetQty)} <span style="font-weight: bold;">/</span> ${formatNumberShort(requiredQty)}</div>
        <div style="position: relative; display: inline-block; ${bgStyle}">
        <img src="${iconPath}" alt="${item}" style="${imageStyle}">
																		 
																						
																					  
        ${displayCraftedNote}
      </div>
		  
    </li>`;


  }

  requiredItemsHTML += '</ul></div>';

  const oldSection = card.querySelector('.required-items');
  if (oldSection) {
    oldSection.outerHTML = requiredItemsHTML;
  }
});

const summaryHTML = generateMissingItemsSummary(results, itemMetadata);
document.querySelector('.left-half').innerHTML = summaryHTML;

}


function generateMissingItemsSummary(results, itemMetadata) {
  const groupLetterTitles = {
    A: "General",
    B: "Enemy Drops",
    C: "Weekly Material",
    D: "Boss Material",
    E: "Domain Drops",
    F: "Flower"
  };

  const rankColors = {
    0: '#acacac',
    1: '#5cc35e',
    2: '#59b4d3',
    3: '#ca6dff',
    4: '#e8d254'
  };

  const totalMissing = {};
  let totalCharacterExpShortfall = 0;
  let totalWeaponExpShortfall = 0;

  for (const result of Object.values(results)) {
  const adjusted = result?.adjusted || {};
  const crafted = result?.cappedCrafted || {};

								  
  for (const [item, qty] of Object.entries(adjusted)) {
    const craftedQty = crafted[item] ?? 0;
    const netMissing = Math.max(0, qty - craftedQty);
    if (netMissing > 0) {
      totalMissing[item] = (totalMissing[item] ?? 0) + netMissing;
    }
  }

																   
														 
   

  if (result.isWeapon) {
    totalWeaponExpShortfall += result.expShortfall ?? 0;
  } else {
    totalCharacterExpShortfall += result.expShortfall ?? 0;
  }
}


  const groupedByGroupLetter = {};
  for (const [item, qty] of Object.entries(totalMissing)) {
    const group = itemMetadata[item]?.group ?? 'Unknown';
    const groupKey = group.charAt(0).toUpperCase();
    if (!groupedByGroupLetter[groupKey]) groupedByGroupLetter[groupKey] = [];
    groupedByGroupLetter[groupKey].push({ item, qty });
  }

    // Ensure 'A' group exists if EXP shortfall is present
if ((totalCharacterExpShortfall > 0 || totalWeaponExpShortfall > 0) && !groupedByGroupLetter['A']) {
  groupedByGroupLetter['A'] = [];
}

  let summaryHTML = '<h3 style ="color: #d5bb88;" >Missing Items Summary</h3>';
  const sortedGroups = Object.keys(groupedByGroupLetter).sort();

  for (const letter of sortedGroups) {
    const displayTitle = groupLetterTitles[letter] ?? letter;
    summaryHTML += `<h4 style ="color: #d5bb88;">${displayTitle}</h4><ul style="list-style: none; padding-left: 10px;">`;

    const items = groupedByGroupLetter[letter].sort((a, b) => {
      const metaA = itemMetadata[a.item] ?? {};
      const metaB = itemMetadata[b.item] ?? {};
      if (metaA.group === metaB.group) {
        return (metaA.rank ?? 0) - (metaB.rank ?? 0);
      }
      return (metaA.group ?? '').localeCompare(metaB.group ?? '');
    });

     // ✅ Add EXP shortfall only under Miscellaneous Items
    if (letter === 'A') {
      if (totalCharacterExpShortfall > 0) {
      const bgStyle = `border-bottom: 2px solid #e8d254; background: linear-gradient( #e8d25408 50%, #e8d25420 ); padding: 3px; border-radius: 6px;`;
      summaryHTML += `
        <li style="display: inline-block; width: 60px; text-align: center; margin: 5px;" onclick="openGroupModal('ab')">
        <div class="mobile-text2" style="font-size: 14px; color: #d5bb88; background-color: black;">${formatNumberShort(totalCharacterExpShortfall)}</div>
          <div style="position: relative; display: inline-block; ${bgStyle}">
            <img src="./ww_icons/general/premium_resonance_potion.webp" alt="EXP" style="width: 50px; height: 50px; border-radius: 4px; color: #d5bb88;">
									
          </div>
			  
        </li>`;
    }

          if (totalWeaponExpShortfall > 0) {
      const bgStyle = `border-bottom: 2px solid #e8d254; background: linear-gradient( #e8d25408 50%, #e8d25420 ); padding: 3px; border-radius: 6px;`;
      summaryHTML += `
        <li style="display: inline-block; width: 60px; text-align: center; margin: 5px;" onclick="openGroupModal('ab')">
        <div class="mobile-text2" style="font-size: 14px; color: #d5bb88; background-color: black;">${formatNumberShort(totalWeaponExpShortfall)}</div>
          <div style="position: relative; display: inline-block; ${bgStyle}">
            <img src="./ww_icons/general/Premium_Energy_Core.png" alt="EXP" style="width: 50px; height: 50px; border-radius: 4px; color: #d5bb88;">
																		  
																				  
																				
          </div>
			  
        </li>`;
    }
  }
 

    for (const { item, qty } of items) {
	   
      const meta = itemMetadata[item] ?? {};
      const icon = meta.image ?? '';
      const bgColor = rankColors[meta.rank] ?? '#eee';
      const bgStyle = `border-bottom: 2px solid${bgColor}; background: linear-gradient(${bgColor}08 50%, ${bgColor}20 ); padding: 3px; border-radius: 6px;`;

      summaryHTML += `
           <li style="display: inline-block; width: 60px; text-align: center; margin: 5px;" onclick="openGroupModal('${meta.group}')">
          <div class="mobile-text2" style="font-size: 14px; color: #d5bb88; background-color: black;">${formatNumberShort(qty)}</div>
           <div style="position: relative; display: inline-block; ${bgStyle}">
            <img src="${icon}" alt="${item}" style="width: 50px; height: 50px; border-radius: 4px; color: #d5bb88;">
          </div>
        </li>`;
    }

    summaryHTML += '</ul>';
  }

  return summaryHTML;
}

function buildGroupMap(itemMetadata) {
  const groupMap = {};
  for (const item in itemMetadata) {
    const { group, rank } = itemMetadata[item];
    if (!groupMap[group]) groupMap[group] = [];
    groupMap[group][rank] = item;
  }
  return groupMap;
}

function reserveRequiredItems(requiredItems, inventory) {
  const reservedInventory = {};
  for (const item in requiredItems) {
    reservedInventory[item] = Math.min(requiredItems[item], inventory[item] ?? 0);
  }
  return reservedInventory;
}

function getAvailableInventory(inventory, reservedInventory) {
  const availableInventory = {};
  for (const item in inventory) {
    const reserved = reservedInventory[item] ?? 0;
    availableInventory[item] = Math.max(0, inventory[item] - reserved);
  }
  return availableInventory;
}

function getCraftedItemsFromInventory(requiredItems, inventory, itemMetadata) {
  const reservedInventory = reserveRequiredItems(requiredItems, inventory);
  const availableInventory = getAvailableInventory(inventory, reservedInventory);
  const groupMap = buildGroupMap(itemMetadata);
  const craftedItems = {};

  for (const group in groupMap) {
    const rankedItems = groupMap[group];
    for (let rank = 1; rank < rankedItems.length; rank++) {
      const lowerItem = rankedItems[rank];
      const higherItem = rankedItems[rank + 1];
      if (!lowerItem || !higherItem) continue;

      const availableLower = availableInventory[lowerItem] ?? 0;
      const craftableQty = Math.floor(availableLower / 3);
      if (craftableQty > 0) {
        craftedItems[higherItem] = (craftedItems[higherItem] ?? 0) + craftableQty;
        availableInventory[lowerItem] -= craftableQty * 3;
        availableInventory[higherItem] = (availableInventory[higherItem] ?? 0) + craftableQty;
      }

      const requiredQty = requiredItems[higherItem] ?? 0;
      const totalAvailable = (inventory[higherItem] ?? 0) + (craftedItems[higherItem] ?? 0);
      reservedInventory[higherItem] = Math.min(requiredQty, totalAvailable);
      availableInventory[higherItem] = Math.max(0, totalAvailable - reservedInventory[higherItem]);
    }
  }
  console.log("Crafted items before capping:", craftedItems);


  // Cap crafted items to actual shortfall
  const cappedCrafted = {};
  for (const item in craftedItems) {
    const requiredQty = requiredItems[item] ?? 0;
    const ownedQty = inventory[item] ?? 0;
    const shortfall = Math.max(0, requiredQty - ownedQty);
    cappedCrafted[item] = Math.min(craftedItems[item], shortfall);
  }

  console.log("Final cappedCrafted path:", cappedCrafted);
  return cappedCrafted;
}										 

function showCraftedItems(button) {
  const card = button.closest('.character-card');
  const name = card.querySelector('.character-name').textContent;
  const uniqueId = card.getAttribute('id');
  selectedCharacter = name;
  document.getElementById('craftableTitle').textContent = `${selectedCharacter}`;


  const paragraphs = card.querySelectorAll('p');
  let currentLevel = '1';
  let desiredLevel = '1';

  paragraphs.forEach(p => {
    const levelMatch = p.textContent.match(/Level:\s*(\d+\*?)\s*→\s*(\d+\*?)/);
    if (levelMatch) {
      currentLevel = levelMatch[1];
      desiredLevel = levelMatch[2];
    }
  });

  const jsid = getJsidFromName(name);
  const isWeapon = weapons.some(w => w.jsid === jsid);

  const skills = [];
  const skillLabels = ['Stat 1', 'Stat 2', 'Stat 3', 'Stat 4', 'Inherent', 'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'];

  if (!isWeapon) {
    const skillMap = {};
    paragraphs.forEach(p => {
      const match = p.textContent.match(/^(Stat \d|Inherent|Skill \d):\s*(\d+)\s*→\s*(\d+)/);
      if (match) {
        const [_, label, current, desired] = match;
        const idPrefix = label.toLowerCase().replace(' ', '');
        skillMap[idPrefix] = { name: idPrefix, current, desired };
      }
    });

    skills.push(...skillLabels.map(label => {
      const id = label.toLowerCase().replace(' ', '');
      return skillMap[id] || { name: id, current: '0', desired: '0' };
    }));
  }


// Hide skill1 and skill2 sections if it's a weapon
if (isWeapon) {
  const craftContainer = document.querySelector('.craftContainer');
  const skill1 = document.querySelector('.cskill1');
  const skill2 = document.querySelector('.cskill2');
  if (craftContainer) craftContainer.style.gridTemplateAreas =
    `"header"
    "level"
    "craft"`;
  if (craftContainer) craftContainer.style.gridTemplateColumns = '400px';
  if (craftContainer) craftContainer.style.height = 'auto';
  if (skill1) skill1.style.display = 'none';
  if (skill2) skill2.style.display = 'none';
} else {
  const craftContainer = document.querySelector('.craftContainer');
  const skill1 = document.querySelector('.cskill1');
  const skill2 = document.querySelector('.cskill2');
  if (craftContainer) craftContainer.style.gridTemplateAreas =
  `"header header header"
  "level level craft"
  "skill1 skill2 craft"`;
  if (craftContainer) craftContainer.style.gridTemplateColumns = 'auto auto 400px';
  if (craftContainer) craftContainer.style.height = 'auto';
  if (skill1) skill1.style.display = 'block';
  if (skill2) skill2.style.display = 'block';
}


  // populateCraftingDropdowns();
  document.getElementById('craftCurrentLevelButton').textContent = currentLevel;
  document.getElementById('craftDesiredLevelButton').textContent = desiredLevel;

  const skillMap = {
    'stat1': 'craftStat1',
    'stat2': 'craftStat2',
    'stat3': 'craftStat3',
    'stat4': 'craftStat4',
    'inherent': 'craftInherent',
    'skill1': 'craftSkill1',
    'skill2': 'craftSkill2',
    'skill3': 'craftSkill3',
    'skill4': 'craftSkill4',
    'skill5': 'craftSkill5'
  };

 // 1. Populate all dropdowns first
populateCraftingDropdowns();

// 2. Set values and disable current dropdowns
skills.forEach(skill => {
  const prefix = skillMap[skill.name];
  if (prefix) {
    const currentSelect = document.getElementById(`${prefix}Current`);
    const desiredSelect = document.getElementById(`${prefix}Desired`);

    if (currentSelect) {
      currentSelect.value = skill.current;
      currentSelect.disabled = true;
      currentSelect.classList.add('button-like');
      currentSelect.style = 'margin-top: 4px';
    }

    if (desiredSelect) {
      // Filter desired options based on current value
      const options = prefix.includes('Stat') || prefix.includes('Inherent') ? [0, 1, 2] : Array.from({ length: 10 }, (_, i) => i + 1);
      desiredSelect.innerHTML = '';
      options.forEach(val => {
        if (val >= parseInt(skill.current)) {
          const option = document.createElement('option');
          option.value = val;
          option.textContent = val;
          desiredSelect.appendChild(option);
        }
      });
      desiredSelect.value = skill.desired;
    }
  }
});

  const allCraftInputs = document.querySelectorAll('#craftableModal select, #craftCurrentLevelButton, #craftDesiredLevelButton');
  allCraftInputs.forEach(el => {
    el.removeEventListener('change', updateCraftingModalFromInputs);
    el.removeEventListener('click', updateCraftingModalFromInputs);
    el.addEventListener('change', updateCraftingModalFromInputs);
    el.addEventListener('click', updateCraftingModalFromInputs);
  });
  

  updateCraftingModalFromInputs();
  document.getElementById('craftableModal').style.display = 'block';
}								   


function closeCraftableModal() {
  document.getElementById('craftableModal').style.display = 'none';
}

function craftingPath(cappedCrafted, requiredItems, inventory, itemMetadata) {
  const reservedInventory = reserveRequiredItems(requiredItems, inventory);
  const availableInventory = getAvailableInventory(inventory, reservedInventory);
  const groupMap = buildGroupMap(itemMetadata);
  const craftedItems = {};
  const usedInventory = {};

  function getItem(group, rank) {
    return groupMap[group]?.[rank] ?? null;
  }

  for (const item of Object.keys(cappedCrafted)) {
    const craftedQty = cappedCrafted[item];
    const { group, rank } = itemMetadata[item];
    if (!group || !rank) continue;

    craftedItems[item] = (craftedItems[item] ?? 0) + craftedQty;
    usedInventory[item] = (usedInventory[item] ?? 0) + craftedQty;

    let currentRank = rank;
    let currentQty = craftedQty;

    while (currentRank > 1) {
      const lowerItem = getItem(group, currentRank - 1);
      if (!lowerItem) break;

      const neededLower = currentQty * 3;
      const availableLower = availableInventory[lowerItem] ?? 0;
      const usedLower = Math.min(neededLower, availableLower);
      const toCraftLower = neededLower - usedLower;

      usedInventory[lowerItem] = (usedInventory[lowerItem] ?? 0) + usedLower;
      craftedItems[lowerItem] = (craftedItems[lowerItem] ?? 0) + toCraftLower;

      availableInventory[lowerItem] = Math.max(0, availableLower - usedLower);

      currentQty = toCraftLower;
      currentRank--;
    }
  }

  return { craftedItems, usedInventory };
}

function allocateExpForSingleCharacter(character, inventory) {
  const jsid = getJsidFromName(character.name);
  const isWeapon = weapons.some(w => w.jsid === jsid);
  const weapon = weapons.find(w => w.jsid === jsid);
  const rank = isWeapon ? (weapon?.rank ?? 3) : (itemMetadata[character.name]?.rank ?? 3);

  const expValues = isWeapon
    ? { expW1: 1000, expW2: 3000, expW3: 8000, expW4: 20000 }
    : { exp1: 1000, exp2: 3000, exp3: 8000, exp4: 20000 };

  const expItems = Object.keys(expValues);

  const requiredExp = isWeapon
    ? calculateWeaponRequiredExp(levelToNumber(character.currentLevel), levelToNumber(character.desiredLevel), rank)
    : calculateRequiredExp(levelToNumber(character.currentLevel), levelToNumber(character.desiredLevel));

  // --- begin new lowest->highest greedy (single character) ---
const allocation = {};
let remainingExp = requiredExp;

// Make a safe local copy of expInventory
const expInventory = expItems.reduce((acc, item) => {
  acc[item] = inventory[item] ?? 0;
  return acc;
}, {});

// LOWEST to HIGHEST by value
const itemsAsc = expItems.sort((a, b) => expValues[a] - expValues[b]);

for (const item of itemsAsc) {
  const value = expValues[item];
  const available = expInventory[item] ?? 0;
  if (available <= 0 || remainingExp <= 0) continue;

  const needed = Math.floor(remainingExp / value);
  const used = Math.min(needed, available);

  if (used > 0) {
    allocation[item] = used;
    expInventory[item] -= used;
    remainingExp -= used * value;
  }
}

// Top up remainder with ONE smallest available item if possible
if (remainingExp > 0) {
  for (const item of itemsAsc) {
    if ((expInventory[item] ?? 0) > 0) {
      allocation[item] = (allocation[item] ?? 0) + 1;
      expInventory[item] -= 1;
      remainingExp = 0;
      break;
    }
  }
}

return {
  expAllocated: allocation,
  expShortfall: Math.max(0, remainingExp),
};
// --- end new lowest->highest greedy (single character) ---
}


function updateCraftingModalFromInputs() {
  const currentLevel = document.getElementById('craftCurrentLevelButton').textContent;
  const desiredLevel = document.getElementById('craftDesiredLevelButton').textContent;

  const skillLabels = ['stat1', 'stat2', 'stat3', 'stat4', 'inherent', 'skill1', 'skill2', 'skill3', 'skill4', 'skill5'];
  const skills = skillLabels.map(label => ({
    name: label,
    current: document.getElementById(`craft${label.charAt(0).toUpperCase() + label.slice(1)}Current`).value,
																															 
    desired: document.getElementById(`craft${label.charAt(0).toUpperCase() + label.slice(1)}Desired`).value
  }));

  const username = document.getElementById('usernameInput').value.trim();
  const inventory = JSON.parse(localStorage.getItem(`inventoryQuantities_${username}`) || '{}');

  const requiredItems = calculateRequiredItems(selectedCharacter, currentLevel, desiredLevel);
  const skillItems = calculateSkillItems(selectedCharacter, skills);
  const totalItems = { ...requiredItems };
  for (const [item, qty] of Object.entries(skillItems)) {
    totalItems[item] = (totalItems[item] ?? 0) + qty;
  }

    const cappedCrafted = getCraftedItemsFromInventory(totalItems, inventory, itemMetadata);
    const { craftedItems, usedInventory }  = craftingPath(cappedCrafted, totalItems, inventory, itemMetadata)
    console.log(craftedItems);


  const finalCrafted = craftedItems; 

  
const character = {
  name: selectedCharacter,
  currentLevel,
  desiredLevel
};


const jsid = getJsidFromName(selectedCharacter);
const isWeapon = weapons.some(w => w.jsid === jsid);
const weapon = weapons.find(w => w.jsid === jsid);
const rank = isWeapon ? (weapon?.rank ?? 3) : (itemMetadata[selectedCharacter]?.rank ?? 3);

const { expAllocated, expShortfall } = allocateExpForSingleCharacter(character, inventory);

const expValues = isWeapon
  ? { expW1: 1000, expW2: 3000, expW3: 8000, expW4: 20000 }
  : { exp1: 1000, exp2: 3000, exp3: 8000, exp4: 20000 };
  

const requiredExp = isWeapon
  ? calculateWeaponRequiredExp(
      levelToNumber(currentLevel),
      levelToNumber(desiredLevel),
      rank
    )
  : calculateRequiredExp(
      levelToNumber(currentLevel),
      levelToNumber(desiredLevel)
    );

const requiredExpItem = projectBestExpCombo(
  levelToNumber(currentLevel),
  levelToNumber(desiredLevel),
  isWeapon,
  rank
);

  const expCreditCost = isWeapon
  ? calculateWeaponExpItemCost(requiredExpItem)
  : calculateExpItemCost(requiredExpItem);

let metExp = 0;
for (const [item, qty] of Object.entries(expAllocated)) {
  metExp += (expValues[item] ?? 0) * qty;
}
metExp = Math.min(metExp, requiredExp);

totalItems["Shell Credits"] = (totalItems["Shell Credits"] ?? 0) + expCreditCost;										


  // Generate breakdown HTML
  let breakdownHTML = '<h3>Requirement Breakdown</h3><ul style="list-style: none; padding: 0; display: flex; flex-wrap: wrap; justify-content: center;">';
  const sortedItems = Object.entries(totalItems).sort(([a], [b]) => {
  const metaA = itemMetadata[a] || {};
  const metaB = itemMetadata[b] || {};
  if (metaA.group === metaB.group) {
    return (metaA.rank || 0) - (metaB.rank || 0);
  }
  return (metaA.group || '').localeCompare(metaB.group || '');
});
    
    // ✅ EXP Breakdown
if (requiredExp > 0) {
  for (const item of Object.keys(expAllocated).sort((a, b) => expValues[a] - expValues[b])) {
    const qty = expAllocated[item];
    if (qty <= 0) continue;
    const expGroup = isWeapon ? 'ac' : 'ab';
    const met = qty * expValues[item];
    const meta = itemMetadata[item] ?? {};
    const iconPath = meta.image ?? 'icons/default.png'; // fallback if missing
    const bgColor = {
    0: '#acacac',
    1: '#5cc35e',
    2: '#59b4d3',
    3: '#ca6dff',
    4: '#e8d254'
      }[meta.rank] ?? '#eee';

      const bgStyle = `border-bottom: 2px solid${bgColor}; background: linear-gradient(${bgColor}01 50%, ${bgColor}10 ); padding: 4px; border-radius: 6px;`;
      const imageStyle = `width: 55px; height: 55px; border-radius: 4px;`;

    breakdownHTML += `
      <li style="display: inline-block; width: 65px; text-align: center; margin: 5px;" onclick="openGroupModal('${expGroup}')">
      
                <div class="mobile-text" style="font-size: 12px; background-color: black; color: ${metExp >= requiredExp ? 'green' : 'red'};">${formatNumberShort(qty)}</div>
				
			  
         <div style="position: relative; display: inline-block;  ${bgStyle}; ">
          <img src="${iconPath}" alt="${item}" style="${imageStyle}">
        </div>
      </li>`;
  }
}

for (const [item, requiredQty] of sortedItems) {

     const invQty = inventory[item] ?? 0;
    const group = itemMetadata[item]?.group;
    const isCraftable = itemMetadata[item]?.rank > 1;
    const sourceCrafted = finalCrafted;
    const craftedQty = sourceCrafted[item] ?? 0;
    const craftedUsed = Math.min(craftedQty, Math.max(0, requiredQty - invQty));
    const metQty = Math.min(invQty + craftedUsed, requiredQty);
    const showCrafted = isCraftable && craftedUsed > 0;

          // Optional: sanity check
          console.log(`${item}: craftedQty=${craftedQty}, craftedUsed=${craftedUsed}, metQty=${metQty}`);
    const meta = itemMetadata[item];
    const iconPath = meta?.image ?? '';
    const rankColors = {
    0: '#acacac',
    1: '#5cc35e',
    2: '#59b4d3',
    3: '#ca6dff',
    4: '#e8d254'
      };

    const bgColor = rankColors[meta?.rank] ?? '#eee';
    const bgStyle = `border-bottom: 2px solid${bgColor}; background: linear-gradient(${bgColor}01 50%, ${bgColor}10 ); padding: 4px; border-radius: 6px;`;
    const imageStyle = `width: 55px; height: 55px; border-radius: 4px;`;

    breakdownHTML += `
      <li style="display: inline-block; width: 65px; text-align: center; margin: 5px;" onclick="openGroupModal('${meta.group}')">
        <div class="mobile-text"  style="font-size: 12px; background-color: black; color: ${metQty >= requiredQty ? 'green' : 'red'};">${formatNumberShort(metQty)} <span style="font-weight: bold;">/</span> ${formatNumberShort(requiredQty)}</div>
        <div style="position: relative; display: inline-block;  ${bgStyle}; ">
          <img src="${iconPath}" alt="${item}" style="${imageStyle}">
          ${showCrafted ? `<div class="mobile-text" style="position: absolute; bottom: 0; left: 0; background: rgba(0,0,0,0.6); color: white; font-size: 10px; padding: 1px 3px; border-radius: 3px;">${craftedUsed}</div>` : ''}
        </div>
      </li>`;

  }
  breakdownHTML += '</ul>';

  // Generate craftable items HTML
  let message = '<h3>Craftable Items from Inventory</h3><ul style="list-style: none; padding: 0; display: flex; flex-wrap: wrap; justify-content: center;">';
  const sortedCrafted = Object.entries(finalCrafted).sort(([a], [b]) => {
    const metaA = itemMetadata[a] || {};
    const metaB = itemMetadata[b] || {};
    if (metaA.group === metaB.group) {
      return (metaA.rank || 0) - (metaB.rank || 0);
    }
    return (metaA.group || '').localeCompare(metaB.group || '');
  });
  
  for (const [item, qty] of sortedCrafted) {
    if (qty <= 0) continue; // Skip items with 0 or less quantity
  
    const meta = itemMetadata[item];
    const iconPath = meta?.image ?? '';

        const rankColors = {
    0: '#acacac',
    1: '#5cc35e',
    2: '#59b4d3',
    3: '#ca6dff',
    4: '#e8d254'
      };

    const bgColor = rankColors[meta?.rank] ?? '#eee';
    const bgStyle = `border-bottom: 2px solid${bgColor}; background: linear-gradient(${bgColor}01 50%, ${bgColor}10 ); padding: 4px; border-radius: 6px;`;
    message += `
      <li style="display: inline-block; width: 60px; text-align: center; margin: 5px;" onclick="openGroupModal('${meta.group}')">
        <div class="mobile-text2" style="font-size: 14px; color: #d5bb88; background-color: black;">${qty} </div>
        <div style="position: relative; display: inline-block; ${bgStyle}">
          <img src="${iconPath}" alt="${item}" style="width: 50px; height: 50px; border-radius: 4px;">
        </div>
      </li>`;

  }
  message += '</ul>';

  document.getElementById('craftableContent').innerHTML = breakdownHTML + message;

  console.log("selectedCharacter:", selectedCharacter);
  console.log("Skills:", skills);
  console.log("Inventory:", inventory);
  console.log("Required Items:", requiredItems);
  console.log("Skill Items:", skillItems);
  console.log("Total Items:", totalItems);

 }

function applyCrafting() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) return alert("Please enter a username.");

  const inventoryKey = `inventoryQuantities_${username}`;
  const inventory = JSON.parse(localStorage.getItem(inventoryKey) ?? '{}');

  const currentLevel = document.getElementById('craftCurrentLevelButton').textContent;
  const desiredLevel = document.getElementById('craftDesiredLevelButton').textContent;

  const skillLabels = ['stat1', 'stat2', 'stat3', 'stat4', 'inherent', 'skill1', 'skill2', 'skill3', 'skill4', 'skill5'];
  const skills = skillLabels.map(label => ({
    name: label,
    current: document.getElementById(`craft${label.charAt(0).toUpperCase() + label.slice(1)}Current`).value,
    desired: document.getElementById(`craft${label.charAt(0).toUpperCase() + label.slice(1)}Desired`).value
  }));

  const requiredItems = calculateRequiredItems(selectedCharacter, currentLevel, desiredLevel);
  const skillItems = calculateSkillItems(selectedCharacter, skills);
  const totalItems = { ...requiredItems };
  for (const [item, qty] of Object.entries(skillItems)) {
    totalItems[item] = (totalItems[item] ?? 0) + qty;
  }

  const crafted = getCraftedItemsFromInventory(totalItems, inventory, itemMetadata);
  const { craftedItems, usedInventory }  = craftingPath(crafted, totalItems, inventory, itemMetadata)

  for (const [item, craftedQty] of Object.entries(craftedItems)) {
    const meta = itemMetadata[item];
    if (!meta || meta.rank <= 1) continue;
    const lowerItem = Object.entries(itemMetadata).find(([_, m]) =>
      m.group === meta.group && m.rank === meta.rank - 1
    )?.[0];
    if (lowerItem) {
      const lowerUsed = craftedQty * 3;
      inventory[lowerItem] = Math.max(0, (inventory[lowerItem] ?? 0) - lowerUsed);
    }
  }

  for (const [item, qty] of Object.entries(totalItems)) {
    inventory[item] = Math.max(0, (inventory[item] ?? 0) - qty);
  }

  const jsid = getJsidFromName(selectedCharacter);
  const isWeapon = weapons.some(w => w.jsid === jsid);
  const weapon = weapons.find(w => w.jsid === jsid);
  const rank = isWeapon ? (weapon?.rank ?? 3) : (itemMetadata[selectedCharacter]?.rank ?? 3);

  // ✅ Use allocateExpByPriority logic for EXP deduction
  const character = {
    name: selectedCharacter,
    currentLevel,
    desiredLevel
  };
  const { expAllocated } = allocateExpForSingleCharacter(character, inventory);

  for (const [expItem, qty] of Object.entries(expAllocated)) {
    inventory[expItem] = Math.max(0, (inventory[expItem] ?? 0) - qty);
  }

    const requiredExpItem = projectBestExpCombo(
      levelToNumber(currentLevel),
      levelToNumber(desiredLevel),
      isWeapon,
      rank
    );

const expCreditCost = isWeapon
  ? calculateWeaponExpItemCost(requiredExpItem)
  : calculateExpItemCost(requiredExpItem);

  inventory["Shell Credit"] = Math.max(0, (inventory["Shell Credit"] ?? 0) - expCreditCost);

  localStorage.setItem(inventoryKey, JSON.stringify(inventory));

  const card = [...document.querySelectorAll('.character-card')]
    .find(c => c.querySelector('.character-name').textContent === selectedCharacter);

  if (card) {
    const paragraphs = card.querySelectorAll('p');
    let originalDesiredLevel = desiredLevel;
    paragraphs.forEach(p => {
      const levelMatch = p.textContent.match(/Level:\s*(\d+\*?)\s*→\s*(\d+\*?)/);
      if (levelMatch) {
        originalDesiredLevel = levelMatch[2];
        p.innerHTML = `<strong>Level:</strong> ${desiredLevel} → ${originalDesiredLevel}`;
      }
    });

    const jsid = getJsidFromName(selectedCharacter);
    const isWeapon = weapons.some(w => w.jsid === jsid);

    if (!isWeapon) {
      const skillMap = {};
      paragraphs.forEach(p => {
        const match = p.textContent.match(/^(Stat \d|Inherent|Skill \d):\s*(\d+)\s*→\s*(\d+)/);
        if (match) {
          const [, label, , originalDesired] = match;
          const idPrefix = label.toLowerCase().replace(' ', '');
          skillMap[idPrefix] = originalDesired;
        }
      });

      for (const skill of skills) {
        const label = skill.name;
        const originalDesired = skillMap[label] || skill.desired;
        const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);
        const paragraph = [...paragraphs].find(p => p.textContent.startsWith(formattedLabel.replace(/(\d)/, ' $1')));
        if (paragraph) {
          paragraph.innerHTML = `<strong>${formattedLabel.replace(/(\d)/, ' $1')}:</strong> ${skill.desired} → ${originalDesired}`;
        }
      }
    }
  }

  closeCraftableModal();
  updateAllCardsWithPriorityLogic();
  saveUserData();
}						  

function toggleCharacter(button) {
  const card = button.closest('.character-card');
  const isOff = card.classList.toggle('off');
  button.textContent = isOff ? 'On' : 'Off';
  console.log(`Toggled ${card.querySelector('.character-name').textContent} to ${isOff ? 'OFF' : 'ON'}`);
  updateAllCardsWithPriorityLogic();
  saveUserData();
}


function openGroupModal(group) {
  const username = document.getElementById('usernameInput').value.trim();
  const inventory = JSON.parse(localStorage.getItem(`inventoryQuantities_${username}`) ?? '{}');
  const itemsInGroup = Object.entries(itemMetadata)
    .filter(([_, meta]) => meta.group === group)
    .sort(([, a], [, b]) => (b.rank ?? 0) - (a.rank ?? 0));

const container = document.getElementById('groupItemsContainer');
container.innerHTML = `
  <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
    ${itemsInGroup.map(([item, meta]) => {
      const qty = inventory[item] ?? 0;
       const rankColors = {
    0: '#acacac',
    1: '#5cc35e',
    2: '#59b4d3',
    3: '#ca6dff',
    4: '#e8d254'
      };

    const bgColor = rankColors[meta?.rank] ?? '#eee';
    const bgStyle = `border-bottom: 2px solid${bgColor}; background: linear-gradient(${bgColor}08 50%, ${bgColor}20 ); padding: 3px; border-radius: 6px 6px 0 0;`;
      return `      
        <div style="display: flex; flex-direction: column; align-items: center; width: 80px; ">    
          <img src="${meta.image}" alt="${item}" style="width: 60px; height: 60px;  ${bgStyle}">          
		  
          <input type="number" id="inv_${item}" value="${qty}" min="0" style="width: 60px; text-align: center; background-color: black; color: #d5bb88; border: solid black;">
          <input type="number" id="add_${item}" value="0" min="0" style="width: 60px; background-color: black; color: #d5bb88; border: solid black; margin-top: 4px; text-align: center;" placeholder="+">
        </div>
      `;
    }).join('')}
  </div>
`;
// Attach blur event to each secondary input
itemsInGroup.forEach(([item]) => {
  const addInput = document.getElementById(`add_${item}`);
  const mainInput = document.getElementById(`inv_${item}`);

  if (addInput && mainInput) {
    addInput.addEventListener('blur', () => {
      const addValue = parseInt(addInput.value) || 0;
      const currentValue = parseInt(mainInput.value) || 0;
      mainInput.value = currentValue + addValue;
      addInput.value = 0;
    });
  }
});


  document.getElementById('groupModal').style.display = 'block';
}

function closeGroupModal() {
  document.getElementById('groupModal').style.display = 'none';
}

function saveGroupInventory() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) return alert("Please enter a username.");
  const inventoryKey = `inventoryQuantities_${username}`;
  const inventory = JSON.parse(localStorage.getItem(inventoryKey) ?? '{}');

  const inputs = document.querySelectorAll('#groupItemsContainer input');
inputs.forEach(input => {
  const item = input.id.replace('inv_', '');
  const baseQty = parseInt(input.value) || 0;
  const addInput = document.getElementById(`add_${item}`);
  const addQty = parseInt(addInput?.value) || 0;
  inventory[item] = baseQty + addQty;
});


  localStorage.setItem(inventoryKey, JSON.stringify(inventory));
  closeGroupModal();
  updateAllCardsWithPriorityLogic();
  updateCraftingModalFromInputs()
  //saveUserData(); /*new*/
}								  

function setAllDesiredToMax() {
  // Set desired level button text (assuming max level is 90)
  const desiredLevelButton = document.getElementById('desiredLevelButton');
  if (desiredLevelButton) {
    desiredLevelButton.textContent = '90';
  }

  // Set all <select> elements for desired stats, inherent, and skills
  const desiredSelects = [
    'stat1Desired', 'stat2Desired', 'stat3Desired', 'stat4Desired',
    'inherentDesired',
    'skill1Desired', 'skill2Desired', 'skill3Desired', 'skill4Desired', 'skill5Desired'
  ];

  desiredSelects.forEach(id => {
    const select = document.getElementById(id);
    if (select && select.options.length > 0) {
      select.selectedIndex = select.options.length - 1; // Select last option (assumed max)
    }
  });
 }
function exportPlannerData() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) {
    alert("Please enter a username.");
    return;
  }

  const inventoryData = JSON.parse(localStorage.getItem(`inventoryQuantities_${username}`) || "{}");
  const plannerData = JSON.parse(localStorage.getItem(`plannerData_${username}`) || "[]");
  const priorityOrder = JSON.parse(localStorage.getItem(`priorityOrder_${username}`) || "[]");

  const data = {
    inventory: inventoryData,
    plannerData: plannerData, // ✅ use structured JSON
    priorityOrder: priorityOrder
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${username}_planner_data.json`;
  a.click();

  URL.revokeObjectURL(url);
}

function importPlannerData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      const username = document.getElementById('usernameInput').value.trim();
      if (!username) {
        alert("Please enter a username before importing.");
        return;
      }

      localStorage.setItem(`inventoryQuantities_${username}`, JSON.stringify(data.inventory || {}));
      localStorage.setItem(`plannerData_${username}`, JSON.stringify(data.plannerData || [])); // ✅ structured JSON
      localStorage.setItem(`priorityOrder_${username}`, JSON.stringify(data.priorityOrder || []));

      location.reload(); // Reload to reflect imported data
    } catch (err) {
      alert("Failed to import planner data. Invalid JSON format.");
    }
  };
  reader.readAsText(file);
}


function saveUserData() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) return alert("Please enter a username.");

  const cards = document.querySelectorAll('.character-card');
  const characterData = [];

  cards.forEach(card => {
    const name = card.querySelector('.character-name').textContent;
    const uniqueId = card.getAttribute('id');
    const priority = parseInt(card.dataset.priority);
    const type = card.dataset.type || 'character'; // fallback just in case
    const isOff = card.classList.contains('off');

    const paragraphs = card.querySelectorAll('p');
    let currentLevel = '1';
    let desiredLevel = '1';
    const skills = [];

    paragraphs.forEach(p => {
      const levelMatch = p.textContent.match(/Level:\s*(\d+\*?)\s*→\s*(\d+\*?)/);
      if (levelMatch) {
        currentLevel = levelMatch[1];
        desiredLevel = levelMatch[2];
      }

      const skillMatch = p.textContent.match(/^(Stat \d|Inherent|Skill \d):\s*(\d+)\s*→\s*(\d+)/);
      if (skillMatch) {
        skills.push({
          name: skillMatch[1],
          current: skillMatch[2],
          desired: skillMatch[3]
        });
      }
    });

    characterData.push({
      type,
      name,
      uniqueId,
      priority,
      currentLevel,
      desiredLevel,
      skills,
      isOff
    });
  });

  localStorage.setItem(`plannerData_${username}`, JSON.stringify(characterData, null, 2));
}

function loadUserData() {
  const usernameInput = document.getElementById('usernameInput');
  const username = usernameInput.value.trim();
  if (!username) return alert("Please enter a username.");

  // Disable the input field
  usernameInput.disabled = true;

  // Enable planner buttons
  const buttonIdsToEnable = [
    "inventoryBtn",
    "addCharacterBtn",
    "addWeaponBtn",
    "setPriorityBtn",
    "saveBtn"
  ];

  buttonIdsToEnable.forEach(id => {
    const btn = document.getElementById(id);		
    if (btn) btn.disabled = false;
    if (btn) btn.style.opacity = '100%';
	 
  });


  // Add Change User button if it doesn't exist
  if (!document.getElementById("changeUserBtn")) {
    const changeUserBtn = document.createElement("button");
    changeUserBtn.id = "changeUserBtn";
    changeUserBtn.className = "uiButton";
    changeUserBtn.textContent = "Change User";
    changeUserBtn.style.marginLeft = "10px";

    changeUserBtn.addEventListener("click", function () {
      usernameInput.disabled = false;
      usernameInput.value = "";
      location.reload(); // Refresh planner
    });

    const loadBtn = document.querySelector("button[onclick*='loadUserData']");
    if (loadBtn && loadBtn.parentNode) {
      loadBtn.parentNode.insertBefore(changeUserBtn, loadBtn.nextSibling);
    }
  }

  const container = document.getElementById('characterContainer');
  container.innerHTML = ''; // Clear existing cards

  const characterData = JSON.parse(localStorage.getItem(`plannerData_${username}`) || '[]');

  characterData.forEach(data => {
    const card = renderCard(data);
    if (card) container.appendChild(card);
  });

  // Restore priority order
  const priorityOrder = JSON.parse(localStorage.getItem(`priorityOrder_${username}`) || '[]');
  if (priorityOrder.length > 0) {
    const cards = Array.from(container.children);
    cards.forEach(card => {
      const uniqueId = card.getAttribute('id');
      card.dataset.priority = priorityOrder.indexOf(uniqueId);
    });
    sortCharacterCards();
  }						 

updateAllCardsWithPriorityLogic();					  
   
  // Generate missing items summary
  const inventory = JSON.parse(localStorage.getItem(`inventoryQuantities_${username}`) ?? '{}');
  const characters = getCharacterDataFromUI();
  const activeCharacters = characters.filter(c => !c.isOff);
  const results = processCharactersByPriority(activeCharacters, inventory, itemMetadata);
  const summaryHTML = generateMissingItemsSummary(results, itemMetadata);
  document.querySelector('.left-half').innerHTML = summaryHTML;
}									

function openWeaponSelectModal() {
  populateWeaponOptions();
  document.getElementById('weaponModal').style.display = 'block';
}

function closeWeaponSelectModal() {
  document.getElementById('weaponModal').style.display = 'none';
}

function populateWeaponOptions() {
  const container = document.getElementById('weaponOptionsContainer');
  container.innerHTML = '';
  // const existingNames = Array.from(document.querySelectorAll('.character-card .character-name'))
  //   .map(el => el.textContent.trim());

    const rankColors = {
    1: '#acacac',
    2: '#5cc35e',
    3: '#59b4d3',
    4: '#ca6dff',
    5: '#e8d254'
  };

  weapons.forEach(weapon => {
    // if (existingNames.includes(weapon.name)) return;
    const div = document.createElement('div');
    div.className = 'character-option';

    const baseColor = rankColors[weapon.rank] ?? '#eee';
    const bgStyle = `linear-gradient(${baseColor}01 50%, ${baseColor}20 )`;

    const img = document.createElement('img');
    img.src = weapon.image;
    img.alt = weapon.name;  
    img.style.width = '100%';
    img.style.background = bgStyle;
    img.style.borderBottom = `3px solid ${baseColor}`;
    img.style.borderRadius = '5px';
    img.style.boxShadow = '0 5px 12px rgba(0,0,0,0.5)';		   

    const label = document.createElement('div');
    label.textContent = weapon.name;
    label.style.marginTop = '5px';
    label.style.fontWeight = 'bold';
    label.style.color = 'white';

    div.style.background = 'rgba(0,0,0,0)'
    div.appendChild(img);
    div.appendChild(label);
    div.onclick = () => selectWeapon(weapon.name);
    container.appendChild(div);
  });
}

function selectWeapon(name) {
  selectedWeapon = name;
  selectedCharacter = ''; 
  closeWeaponSelectModal();
  document.getElementById('levelModalTitle').textContent = `${name}`;
  document.getElementById('levelModal').style.display = 'block';

  // Hide skill sections

  const skill1 = document.querySelector('.skill1');
  const skill2 = document.querySelector('.skill2');
  if (skill1) skill1.style.display = 'none';
  if (skill2) skill2.style.display = 'none';
	 
// Hide the "Set All Desired to Max" button
  const setAllButton = document.getElementById('setAllDesiredButton');
  if (setAllButton) setAllButton.style.display = 'none';

  // Change confirm button to call confirmWeapon
  const confirmBtn = document.getElementById('confirmButton');
  confirmBtn.setAttribute('onclick', 'confirmWeapon()');
    
 // ✅ Automatically set desired level based on weapon rank
  const weapon = weapons.find(w => w.name === name);
  const maxLevel = (weapon?.rank === 1 || weapon?.rank === 2) ? '70' : '90';
  document.getElementById('desiredLevelButton').textContent = maxLevel;
}


function confirmWeapon() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) return alert("Please enter a username.");

  const currentLevel = document.getElementById('currentLevelButton').innerText;
  const desiredLevel = document.getElementById('desiredLevelButton').innerText;

  const weapon = weapons.find(w => w.name === selectedWeapon);
  if (!weapon || !weapon.image) {
    alert(`Weapon data not found for "${selectedWeapon}".`);
    return;
  }

  const requiredItems = calculateRequiredItems(selectedWeapon, currentLevel, desiredLevel);
  const inventory = JSON.parse(localStorage.getItem(`inventoryQuantities_${username}`) ?? '{}');
   const fallbackCrafted = getCraftedItemsFromInventory(requiredItems, inventory, itemMetadata);
  const adjustedItems = craftingPath(fallbackCrafted, requiredItems, inventory, itemMetadata);

  const container = document.getElementById('characterContainer');
																										
  if (editingCard) {
    const updatedCard = renderCard({
      type: 'weapon',
      name: selectedWeapon,
      uniqueId: editingCard.id,
      priority: parseInt(editingCard.dataset.priority),
      currentLevel,
      desiredLevel,
      isOff: editingCard.classList.contains('off')
    });
    if (updatedCard) {
      editingCard.replaceWith(updatedCard);
    }
    editingCard = null;
  } else {
																	
																		 
    const uniqueId = `weapon-${selectedWeapon.replace(/\s+/g, '-')}-${Date.now()}`;
    const cards = container.querySelectorAll('.character-card');
									  
									  
    const priorities = Array.from(cards).map(card => parseInt(card.dataset.priority, 10));
    const nextPriority = priorities.length > 0 ? Math.max(...priorities) + 1 : 0;
    const newCard = renderCard({
      type: 'weapon',
      name: selectedWeapon,
      uniqueId,
      priority: nextPriority,
      currentLevel,
      desiredLevel,
      isOff: false
    });
    if (newCard) {
      container.appendChild(newCard);
    }
  }

  closeLevelModal();
  updateAllCardsWithPriorityLogic();
  saveUserData();
  savePriorityOrder();
}

    function openCharacterSelectModal() {
      populateCharacterOptions();
      document.getElementById('characterModal').style.display = 'block';
    }

    function closeCharacterSelectModal() {
      document.getElementById('characterModal').style.display = 'none';
  // Clear group filters
							   
      activeElementFilters.clear();
	activeRankFilters.clear();							

      // Remove active class from all group filter buttons
      document.querySelectorAll('#rankFilters button').forEach(btn => {
        btn.classList.remove('active');      
        });
      document.querySelectorAll('#elementFilters button').forEach(btn => {
        btn.classList.remove('active');      
        });


    }

  const activeElementFilters = new Set();

function toggleElementFilter(atrb) {
  const button = [...document.querySelectorAll('#elementFilters button')]
    .find(btn => {
      const img = btn.querySelector('img');
      return img && img.alt.toLowerCase() === atrb;
    });

  if (!button) return; // Safety check

  if (activeElementFilters.has(atrb)) {
    activeElementFilters.delete(atrb);
    button.classList.remove('active');
  } else {
    activeElementFilters.add(atrb);
    button.classList.add('active');
  }

  populateCharacterOptions(); // Refresh character list
}

  const activeRankFilters = new Set();

function toggleRankFilter(rank) {
  const button = [...document.querySelectorAll('#rankFilters button')]
    .find(btn => {
      const img = btn.querySelector('img');
      return img && img.alt.includes(`Rank ${rank}`);
    });

  if (!button) return; // Safety check

  if (activeRankFilters.has(rank)) {
    activeRankFilters.delete(rank);
    button.classList.remove('active');
  } else {
    activeRankFilters.add(rank);
    button.classList.add('active');
  }

  populateCharacterOptions(); // Refresh character list
}

  function populateCharacterOptions() {
  const container = document.getElementById('characterOptionsContainer');
  container.innerHTML = '';

  
      const rankColors = {
        1: '#e8d254', 
        2: '#ca6dff' 
      };


  // Get names of characters already added
  const existingNames = Array.from(document.querySelectorAll('.character-card .character-name'))
    .map(el => el.textContent.trim());

  characters.forEach(char => {
    if (existingNames.includes(char.name)) return; // Skip if already added

    // Filter by element if any filters are active
    if (activeElementFilters.size > 0 && !activeElementFilters.has(char.atrb)) return;
    
												  
																						

    // Rank filter
    if (activeRankFilters.size > 0 && !activeRankFilters.has(char.rank)) return;
	
    const div = document.createElement('div');
    div.className = 'character-option';

    const baseColor = rankColors[char.rank] ?? '#eee';
    const bgStyle = `linear-gradient(${baseColor}01 50%, ${baseColor}20 )`;

    const img = document.createElement('img');
    img.src = char.image;
    img.alt = char.name;
     img.style.width = '100px';

    img.style.height = 'auto';

    img.style.background = bgStyle;
    img.style.borderBottom = `3px solid ${baseColor}`;
    img.style.borderRadius = '5px';
    img.style.boxShadow = '0 5px 12px rgba(0,0,0,0.5)';		   


    const label = document.createElement('div');
    label.textContent = char.name;
    label.style.marginTop = '5px';
    label.style.fontWeight = 'bold';
	label.style.color = 'white';

    div.style.background = 'rgba(0,0,0,0)';							
    div.appendChild(img);
    div.appendChild(label);
    div.onclick = () => selectCharacter(char.name);

    container.appendChild(div);
  });
}
 

  function selectCharacter(name) {
  selectedCharacter = name;
  selectedWeapon = ''; // ✅ Clear weapon context when adding a character
  closeCharacterSelectModal();
  document.getElementById('levelModalTitle').textContent = `${name}`;
  populateDropdowns();
  document.getElementById('confirmButton').setAttribute('onclick', 'confirmCharacter()');

  const setAllButton = document.getElementById('setAllDesiredButton');
  if (setAllButton) setAllButton.style.display = 'inline-block';

  const skill1 = document.querySelector('.skill1');
  const skill2 = document.querySelector('.skill2');
  if (skill1) skill1.style.display = 'block';
  if (skill2) skill2.style.display = 'block';
  	 
    
// ✅ Automatically set desired level to max
  document.getElementById('desiredLevelButton').textContent = '90';

  // Load character-specific level requirements /*new*/
  const character = characters.find(c => c.name === name);
if (!character || !character.jsid) {
  alert(`No data found for ${name}`);
  return;
}
const jsid = character.jsid;
if (levelRequirements[jsid] && skillRequirements[jsid]) {
  document.getElementById('levelModal').style.display = 'block';
} else {
  alert(`No data found for ${name}`);
}

}


function closeLevelModal() {
      document.getElementById('levelModal').style.display = 'none';
      editingCard = null; // ✅ Clear editing context
    }

function populateDropdowns() {
  const skillOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const shortSkillOptions = [0, 1, 2];

  const skillDropdowns = [
    'stat1Current', 'stat1Desired',
    'stat2Current', 'stat2Desired',
    'stat3Current', 'stat3Desired',
    'stat4Current', 'stat4Desired',
    'inherentCurrent', 'inherentDesired',
    'skill1Current', 'skill1Desired',
    'skill2Current', 'skill2Desired',
    'skill3Current', 'skill3Desired',
    'skill4Current', 'skill4Desired',
    'skill5Current', 'skill5Desired'
  ];

  skillDropdowns.forEach(id => {
    const select = document.getElementById(id);
    select.innerHTML = '';
    const options = id.startsWith('stat') || id.startsWith('inherent') ? shortSkillOptions : skillOptions;
    options.forEach(val => {
      const option = document.createElement('option');
      option.value = val;
      option.textContent = val;
      select.appendChild(option);
    });
  });

  const pairs = [
    ['stat1Current', 'stat1Desired'],
    ['stat2Current', 'stat2Desired'],
    ['stat3Current', 'stat3Desired'],
    ['stat4Current', 'stat4Desired'],
    ['inherentCurrent', 'inherentDesired'],
    ['skill1Current', 'skill1Desired'],
    ['skill2Current', 'skill2Desired'],
    ['skill3Current', 'skill3Desired'],
    ['skill4Current', 'skill4Desired'],
    ['skill5Current', 'skill5Desired']
  ];

  pairs.forEach(([currentId, desiredId]) => {
    const currentSelect = document.getElementById(currentId);
    const desiredSelect = document.getElementById(desiredId);
    const options = currentId.startsWith('stat') || currentId.startsWith('inherent') ? shortSkillOptions : skillOptions;

    const updateDesiredOptions = () => {
    const currentValue = parseInt(currentSelect.value);
    const selectedDesiredValue = parseInt(desiredSelect.value);

    // Rebuild the desired dropdown with only valid options
    desiredSelect.innerHTML = '';
    options.forEach(val => {
      if (val >= currentValue) {
        const option = document.createElement('option');
        option.value = val;
        option.textContent = val;
        desiredSelect.appendChild(option);
      }
    });

    // Preserve the user's selection if it's still valid
    if (!isNaN(selectedDesiredValue) && selectedDesiredValue >= currentValue) {
      desiredSelect.value = selectedDesiredValue;
    } else {
      // Otherwise, default to current value
      desiredSelect.value = currentValue;
    }
  };

    currentSelect.addEventListener('change', updateDesiredOptions);
    updateDesiredOptions(); // Initialize on load
  });
}

  function populateCraftingDropdowns() {
  const skillOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const shortSkillOptions = [0, 1, 2];

  const skillDropdowns = [
    'craftStat1Current', 'craftStat1Desired',
    'craftStat2Current', 'craftStat2Desired',
    'craftStat3Current', 'craftStat3Desired',
    'craftStat4Current', 'craftStat4Desired',
    'craftInherentCurrent', 'craftInherentDesired',
    'craftSkill1Current', 'craftSkill1Desired',
    'craftSkill2Current', 'craftSkill2Desired',
    'craftSkill3Current', 'craftSkill3Desired',
    'craftSkill4Current', 'craftSkill4Desired',
    'craftSkill5Current', 'craftSkill5Desired'
  ];

  skillDropdowns.forEach(id => {
    const select = document.getElementById(id);
    select.innerHTML = '';
    const options = id.startsWith('craftStat') || id.startsWith('craftInherent') ? shortSkillOptions : skillOptions;
    options.forEach(val => {
      const option = document.createElement('option');
      option.value = val;
      option.textContent = val;
      select.appendChild(option);
    });
  });

  const pairs = [
    ['craftStat1Current', 'craftStat1Desired'],
    ['craftStat2Current', 'craftStat2Desired'],
    ['craftStat3Current', 'craftStat3Desired'],
    ['craftStat4Current', 'craftStat4Desired'],
    ['craftInherentCurrent', 'craftInherentDesired'],
    ['craftSkill1Current', 'craftSkill1Desired'],
    ['craftSkill2Current', 'craftSkill2Desired'],
    ['craftSkill3Current', 'craftSkill3Desired'],
    ['craftSkill4Current', 'craftSkill4Desired'],
    ['craftSkill5Current', 'craftSkill5Desired']
  ];

  pairs.forEach(([currentId, desiredId]) => {
    const currentSelect = document.getElementById(currentId);
    const desiredSelect = document.getElementById(desiredId);
    const options = currentId.startsWith('craftStat') || currentId.startsWith('craftInherent') ? shortSkillOptions : skillOptions;

    const updateDesiredOptions = () => {
      const currentValue = parseInt(currentSelect.value);
      desiredSelect.innerHTML = '';
      options.forEach(val => {
        if (val >= currentValue) {
          const option = document.createElement('option');
          option.value = val;
          option.textContent = val;
          desiredSelect.appendChild(option);
        }
      });
    };

    currentSelect.addEventListener('change', updateDesiredOptions);
    updateDesiredOptions(); // Initialize on load
  });
}

function renderCard({ type, name, uniqueId, priority, currentLevel, desiredLevel, skills = [], isOff = false }) {
  const isWeapon = type === 'weapon';
  const data = isWeapon
    ? weapons.find(w => w.name === name)
    : characters.find(c => c.name === name);

  if (!data || !data.image) return null;

 let rankColors;
if (!isWeapon) {
  rankColors = {
    1: '#e8d254',
    2: '#ca6dff'
  };
} else {
  rankColors = {
    1: '#acacac',
    2: '#5cc35e',
    3: '#59b4d3',
    4: '#ca6dff',
    5: '#e8d254'
  };
}
  const baseColor = rankColors[data.rank] ?? '#eee';
  const bgStyle = `background: linear-gradient(${baseColor}08 50%, ${baseColor}80 ); border-Bottom: 3px solid ${baseColor};`

  let requiredItemsHTML = '<div class="required-items" style="text-align: center; padding: 5px 10px;">';
		
  const leftStats = !isWeapon
    ? skills
        .filter(skill => ['Stat 1', 'Stat 2', 'Stat 3', 'Stat 4', 'Inherent'].includes(skill.name))
        .map(skill => `<p><strong>${skill.name}:</strong> ${skill.current} → ${skill.desired}</p>`)
        .join('')
    : '';

  const rightStats = !isWeapon
    ? skills
        .filter(skill => skill.name.startsWith('Skill'))
        .map(skill => `<p><strong>${skill.name}:</strong> ${skill.current} → ${skill.desired}</p>`)
        .join('')
    : '';

  const contentHTML = `
      <div class="character-header">
      <div style="display: flex; flex-direction: row; align-items: left; gap: 10px;">
      <button class="edit-button" onclick="editCharacter(this)">Edit</button>
      <button class="crafting-button" onclick="showCraftedItems(this)">Craft</button>
      </div>
      <span class="character-name">${name}</span>
      <div style="display: flex; flex-direction: row; align-items: right; gap: 10px;">
      <button class="remove-button" onclick="removeCharacter(this)">X</button>      
      <button class="toggle-button" onclick="toggleCharacter(this)">${isOff ? 'On' : 'Off'}</button>
      </div>	      
    </div>
    ${!isWeapon ? 
      `
      <div style="display: flex; justify-content: center;">
  <div style="display: flex; gap: 20px; align-items: flex-start;">
    <div>${leftStats}</div>
    <div style="display: flex; flex-direction: row; gap: 20px; align-items: flex-start; ">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height:170px  ">
        <p><strong>Level:</strong> ${currentLevel} → ${desiredLevel}</p>
        <img src="${data.image}" alt="${name}" style="${bgStyle}; width: 120px; height: 120px; border-radius: 6px; object-fit: cover; margin-top: 5px;">
      </div>
														
      <div>
        ${rightStats}
      </div>
    </div>
  </div>
</div>
      ` 
      : 
      `
      <div style="display: flex; flex-direction: row; gap: 20px; align-items: flex-start; justify-content: center; ">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height:170px  ">
        <p><strong>Level:</strong> ${currentLevel} → ${desiredLevel}</p>
    <img src="${data.image}" alt="${name}" style=" ${bgStyle} width: 120px; height: 120px; border-radius: 6px; object-fit: cover;">
    <div>
    </div>
  </div>
</div>
      `}
     
    <hr style="border-bottom: 1px solid #d5bb88; box-shadow: 1px 0px 5px #d5bb88;">
    ${requiredItemsHTML}
  `;

  const card = document.createElement('div');
  card.className = 'character-card';
  card.setAttribute('id', uniqueId);
  card.dataset.uniqueId = uniqueId;
  card.setAttribute('data-priority', priority);
  card.innerHTML = contentHTML;
  card.dataset.type = type;


  if (isOff) {
    card.classList.add('off');
  }

  return card;
}

function confirmCharacter() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) {
    alert("Please enter a username.");
    return;
  }

  const currentLevel = document.getElementById('currentLevelButton').innerText;
  const desiredLevel = document.getElementById('desiredLevelButton').innerText;

  const skills = [
    { name: 'Stat 1', current: document.getElementById('stat1Current').value, desired: document.getElementById('stat1Desired').value },
    { name: 'Stat 2', current: document.getElementById('stat2Current').value, desired: document.getElementById('stat2Desired').value },
    { name: 'Stat 3', current: document.getElementById('stat3Current').value, desired: document.getElementById('stat3Desired').value },
    { name: 'Stat 4', current: document.getElementById('stat4Current').value, desired: document.getElementById('stat4Desired').value },
    { name: 'Inherent', current: document.getElementById('inherentCurrent').value, desired: document.getElementById('inherentDesired').value },
    { name: 'Skill 1', current: document.getElementById('skill1Current').value, desired: document.getElementById('skill1Desired').value },
    { name: 'Skill 2', current: document.getElementById('skill2Current').value, desired: document.getElementById('skill2Desired').value },
    { name: 'Skill 3', current: document.getElementById('skill3Current').value, desired: document.getElementById('skill3Desired').value },
    { name: 'Skill 4', current: document.getElementById('skill4Current').value, desired: document.getElementById('skill4Desired').value },
    { name: 'Skill 5', current: document.getElementById('skill5Current').value, desired: document.getElementById('skill5Desired').value }
  ];

  const requiredItems = calculateRequiredItems(selectedCharacter, currentLevel, desiredLevel);
  const skillItems = calculateSkillItems(selectedCharacter, skills);
  const totalItems = { ...requiredItems };

  for (const [item, qty] of Object.entries(skillItems)) {
    totalItems[item] = (totalItems[item] || 0) + qty;
  }

  // const inventory = JSON.parse(localStorage.getItem(`inventoryQuantities_${username}`) || '{}');
  // const fallbackCrafted = getCraftedItemsFromInventory(totalItems, inventory, itemMetadata);
  // const adjustedItems = craftingPath(fallbackCrafted, totalItems, inventory, itemMetadata);

  const container = document.getElementById('characterContainer');

  if (editingCard) {
    const updatedCard = renderCard({
      type: 'character',
      name: selectedCharacter,
      uniqueId: editingCard.id,
      priority: parseInt(editingCard.dataset.priority),
      currentLevel,
      desiredLevel,
      skills,
      isOff: editingCard.classList.contains('off')
    });
    if (updatedCard) {
      editingCard.replaceWith(updatedCard);
    }
    editingCard = null;
  } else {																	   
    const uniqueId = `char-${selectedCharacter.replace(/\s+/g, '-')}-${Date.now()}`;
    const cards = container.querySelectorAll('.character-card');									
const priorities = Array.from(cards).map(card => parseInt(card.dataset.priority, 10));
const nextPriority = priorities.length > 0 ? Math.max(...priorities) + 1 : 0;

    const newCard = renderCard({
      type: 'character',
      name: selectedCharacter,
      uniqueId,
      priority: nextPriority,
      currentLevel,
      desiredLevel,
      skills,
      isOff: false
    });
    if (newCard) {
      container.appendChild(newCard);
    }
  }

  closeLevelModal();
  updateAllCardsWithPriorityLogic();
  saveUserData();
  savePriorityOrder();
}							 


let pendingRemoveButton = null;

function removeCharacter(button) {
  pendingRemoveButton = button;
  const card = button.closest('.character-card');
  const name = card.querySelector('.character-name')?.textContent || 'this character';
  const imageSrc = card.querySelector('img')?.src || '';
  
  const jsid = getJsidFromName(name);
  console.log("JSID:", jsid);
  const isWeapon = weapons.some(w => w.jsid === jsid);
		

// Find character object by name
  const character = characters.find(c => c.name === name);
  const weapon = weapons.find(w => w.name === name);
  
let rankColors;
if (!isWeapon) {
  rankColors = {
    1: '#e8d254',
    2: '#ca6dff'
  };
} else {
  rankColors = {
    1: '#acacac',
    2: '#5cc35e',
    3: '#59b4d3',
    4: '#ca6dff',
    5: '#e8d254'
  };
}

  const bgColor = !isWeapon ? rankColors[character.rank] : rankColors[weapon.rank];
  const bgStyle = `linear-gradient(${bgColor}05 50%, ${bgColor}40 )`;
  const bbStyle = `3px solid ${bgColor}`;


  document.getElementById('confirmCharacterName').textContent = name;
  const imageElement = document.getElementById('confirmCharacterImage');
  if (imageSrc) {
    imageElement.src = imageSrc;
    imageElement.style.display = 'block';
    imageElement.style.backgroundImage = bgStyle;
    imageElement.style.borderBottom = bbStyle;
    imageElement.style.borderRadius = '0 0 6px 6px';
  } else {
    imageElement.style.display = 'none';
  }
  document.getElementById('confirmModal').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('confirmYes').onclick = function () {
    if (pendingRemoveButton) {
      const card = pendingRemoveButton.closest('.character-card');
      
        card.remove();
        updateAllCardsWithPriorityLogic();
        savePriorityOrder();
        saveUserData();
      
    }
    document.getElementById('confirmModal').style.display = 'none';
  };

  document.getElementById('confirmNo').onclick = function () {
    document.getElementById('confirmModal').style.display = 'none';
  };
});


// Used for + / − buttons
const fullLevels = [];
for (let i = 1; i <= 90; i++) {
  fullLevels.push(i);
  if ([20, 40, 50, 60, 70, 80].includes(i)) {
    fullLevels.push(i + '*');
  }
}
// Used for modal buttons
const modalLevels = [1, 20, '20*', 40, '40*', 50, '50*', 60, '60*', 70, '70*', 80, '80*', 90];

  let currentLevel = 1;
  let desiredLevel = 1;
  let craftCurrentLevel = 1;
  let craftDesiredLevel = 1;
  
function openModal(levelType) {
  const modal = document.getElementById('lvlModal');
  const modalContent = modal.querySelector('.lvl-modal-content');
  const modalButtons = document.getElementById('modalButtons');
  modalButtons.innerHTML = '';

  console.log("Selected Weapon:", selectedWeapon);
  console.log("Selected Character:", selectedCharacter);
  console.log("Weapons List:", weapons.map(w => w.name));

  const isWeapon = weapons.some(w => w.name === selectedWeapon);
  console.log("Is Weapon:", isWeapon);

  let weaponRank = 3;
  let allowedLevels = modalLevels;

  if (isWeapon) {
												  
    const weapon = weapons.find(w => w.name === selectedWeapon);
    console.log("Found Weapon Object:", weapon);
    if (weapon && weapon.rank) {
      weaponRank = weapon.rank;
    }

    allowedLevels = (weaponRank === 1 || weaponRank === 2)
      ? [1, 20, '20*', 40, '40*', 50, '50*', 60, '60*', 70]
      : modalLevels;
  }

  // Get current level for comparison
  const currentLevelRaw = document.getElementById('currentLevelButton')?.textContent || '1';
  const currentLevel = currentLevelRaw.includes('*') ? parseInt(currentLevelRaw) + 0.5 : parseInt(currentLevelRaw);

  allowedLevels.forEach(level => {
    const button = document.createElement('button');
    button.textContent = level;

    const levelValue = typeof level === 'string' && level.includes('*') ? parseInt(level) + 0.5 : parseInt(level);

    if (levelType === 'desiredLevel' && levelValue < currentLevel) {
      button.disabled = true;
      button.style.opacity = '0.5';
      button.style.cursor = 'not-allowed';
    } else {
      button.onclick = () => {
        setLevel(levelType, level);
        closeModal();
      };
    }

button.style.width = (
  isWeapon
    ? (weaponRank === 1 || weaponRank === 2
        ? (level === 1 || level === 70)
        : (level === 1 || level === 90))
    : (level === 1 || level === 90)
) ? '98%' : '48%';
    button.style.margin = '1%';
    button.style.height = '30px';

    modalButtons.appendChild(button);
  });

  modal.style.display = 'block';

  const button = document.getElementById(levelType + 'Button');
  const rect = button.getBoundingClientRect();

  modalContent.style.display = 'block';
  modalContent.style.visibility = 'hidden';
  const modalWidth = modalContent.offsetWidth;
  modalContent.style.visibility = 'visible';

  modalContent.style.left = `${rect.left + window.scrollX + rect.width / 2 - modalWidth / 2}px`;
  modalContent.style.top = `${rect.bottom + window.scrollY - 20}px`;
}														  

function openCraftModal(levelType) {
  const modal = document.getElementById('lvlModal');
  const modalContent = modal.querySelector('.lvl-modal-content');
  const modalButtons = document.getElementById('modalButtons');
  modalButtons.innerHTML = '';
  
  // Determine weapon rank
  let weaponRank = 3; // default to 3 if not found
  const weapon = weapons.find(w => w.name === selectedCharacter);
  if (weapon && weapon.rank) {
    weaponRank = weapon.rank;
  }

  // Filter levels based on rank
  const allowedLevels = (weaponRank === 1 || weaponRank === 2)
    ? [1, 20, '20*', 40, '40*', 50, '50*', 60, '60*', 70]
    : modalLevels;


  // Get current level as a number (handle '*' levels as half-levels)
  const currentLevelRaw = document.getElementById('craftCurrentLevelButton')?.textContent || '1';
  const currentLevel = currentLevelRaw.includes('*') ? parseInt(currentLevelRaw) + 0.5 : parseInt(currentLevelRaw);

  allowedLevels.forEach(level => {
	 
    const button = document.createElement('button');
    button.textContent = level;

    // Convert level to comparable number
    const levelValue = typeof level === 'string' && level.includes('*') ? parseInt(level) + 0.5 : parseInt(level);

    // Disable if level is below current and selecting desired level
    if (levelType === 'craftDesiredLevel' && levelValue < currentLevel) {
      button.disabled = true;
      button.style.opacity = '0.5';
      button.style.cursor = 'not-allowed';
    } else {
      button.onclick = () => {
	   
        setLevel(levelType, level);
        closeModal();
      };
    }

    button.style.width = (
      (weaponRank === 1 || weaponRank === 2)
        ? (level === 1 || level === 70)
        : (level === 1 || level === 90)
								   
    ) ? '98%' : '48%';
    button.style.margin = '1%';
									 
    button.style.height = '30px';

    modalButtons.appendChild(button);
  });		  
  modal.style.display = 'block';

  // Positioning logic
  const triggerButton = document.getElementById(levelType + 'Button');
  const rect = triggerButton.getBoundingClientRect();

  modalContent.style.display = 'block';
  modalContent.style.visibility = 'hidden';
  const modalWidth = modalContent.offsetWidth;
  modalContent.style.visibility = 'visible';

																														 
  modalContent.style.left = `${rect.left + window.scrollX + rect.width / 2 - modalWidth / 2}px`;
  modalContent.style.top = `${rect.bottom + window.scrollY - 20}px`;
}

  function closeModal() 
  {
    const modalContent = document.querySelector('.lvl-modal-content');
    modalContent.style.display = 'none';
  }				   

  function setLevel(levelType, level) {
   
  if (levelType === 'currentLevel') {
    currentLevel = level;
    document.getElementById('currentLevelButton').textContent = level;
  } else if (levelType === 'desiredLevel') {
    desiredLevel = level;
    document.getElementById('desiredLevelButton').textContent = level;
  } else if (levelType === 'craftCurrentLevel') {
    craftCurrentLevel = level;
    document.getElementById('craftCurrentLevelButton').textContent = level;
  } else if (levelType === 'craftDesiredLevel') {
    craftDesiredLevel = level;
    document.getElementById('craftDesiredLevelButton').textContent = level;
  }
  if (levelType.startsWith('craft')) {
  updateCraftingModalFromInputs();
  }

}									   


  function adjustLevel(id, delta) {
											 
  const element = document.getElementById(id);

  if (element.tagName === 'SELECT') {
    // Skill dropdown
    const newIndex = element.selectedIndex + delta;
    if (newIndex >= 0 && newIndex < element.options.length) {
      element.selectedIndex = newIndex;
    }
  } else {
    // Level buttons
    if (id === 'currentLevelButton') {
      currentLevel = adjust(currentLevel, delta);
      document.getElementById('currentLevelButton').textContent = currentLevel;
    } else if (id === 'desiredLevelButton') {
      desiredLevel = adjust(desiredLevel, delta);
      document.getElementById('desiredLevelButton').textContent = desiredLevel;
    } else if (id === 'craftCurrentLevelButton') {
      craftCurrentLevel = adjust(craftCurrentLevel, delta);
      document.getElementById('craftCurrentLevelButton').textContent = craftCurrentLevel;
    } else if (id === 'craftDesiredLevelButton') {
      craftDesiredLevel = adjust(craftDesiredLevel, delta);
      document.getElementById('craftDesiredLevelButton').textContent = craftDesiredLevel;
    }
  }
  
  if (id.startsWith('craft')) {
    updateCraftingModalFromInputs();
  }
  }
 

   function adjust(level, adjustment) {
    const index = fullLevels.indexOf(level);
    if (index === -1) return level;
    const newIndex = Math.max(0, Math.min(fullLevels.length - 1, index + adjustment));
    return fullLevels[newIndex];
  }


  window.onclick = function(event) {
      const modal = document.getElementById('lvlModal');
      if (event.target === modal) {
          modal.style.display = 'none';
      }
    }   
let editingCard = null;

	
					   
function editCharacter(button) {
  editingCard = button.closest('.character-card');
  selectedCharacter = editingCard.querySelector('.character-header span').textContent;

  const jsid = getJsidFromName(selectedCharacter);
  console.log("JSID:", jsid);
  const isWeapon = weapons.some(w => w.jsid === jsid);
 if (isWeapon) {
  selectedWeapon = selectedCharacter;
} else {
  selectedWeapon = ''; // ✅ Clear weapon context when editing a character
}
// Hide or show skill/stat/inherent sections based on isWeapon
if (isWeapon) {
  const levelContainer = document.querySelector('.levelContainer');
  const skill1 = document.querySelector('.skill1');
  const skill2 = document.querySelector('.skill2');
  if (levelContainer) levelContainer.style.height = 'auto';
  if (skill1) skill1.style.display = 'none';
  if (skill2) skill2.style.display = 'none';
  const setAllButton = document.getElementById('setAllDesiredButton');
  if (setAllButton) setAllButton.style.display = 'none';																	  
														

} else {
  const levelContainer = document.querySelector('.levelContainer');
  const skill1 = document.querySelector('.skill1');
  const skill2 = document.querySelector('.skill2');
  if (levelContainer) levelContainer.style.height = 'auto';
  if (skill1) skill1.style.display = 'block';
  if (skill2) skill2.style.display = 'block';
  const setAllButton = document.getElementById('setAllDesiredButton');
  if (setAllButton) setAllButton.style.display = 'inline-block';																	  
																
}

  document.getElementById('levelModalTitle').textContent = selectedCharacter;
  populateDropdowns();

  // Extract and set current level values using label matching
  const paragraphs = editingCard.querySelectorAll('p');
  let currentLevel = '1';
  let desiredLevel = '1';
  paragraphs.forEach(p => {
    const levelMatch = p.textContent.match(/Level:\s*(\d+\*?)\s*→\s*(\d+\*?)/);
    if (levelMatch) {
      currentLevel = levelMatch[1];
      desiredLevel = levelMatch[2];
    }
  });
  document.getElementById('currentLevelButton').innerText = currentLevel;
  document.getElementById('desiredLevelButton').innerText = desiredLevel;

  const confirmBtn = document.getElementById('confirmButton');
  confirmBtn.setAttribute('onclick', isWeapon ? 'confirmWeapon()' : 'confirmCharacter()');

  // Extract and set skill values using label matching
  if (!isWeapon) {
    const skillLabels = ['Stat 1', 'Stat 2', 'Stat 3', 'Stat 4', 'Inherent', 'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'];
    const skillMap = {};

    paragraphs.forEach(p => {
      const match = p.textContent.match(/^(Stat \d|Inherent|Skill \d):\s*(\d+)\s*→\s*(\d+)/);
      if (match) {
        const [_, label, current, desired] = match;
        const idPrefix = label.toLowerCase().replace(' ', '');
        skillMap[idPrefix] = { current, desired };
      }
    });

    skillLabels.forEach(label => {
								 
      const idPrefix = label.toLowerCase().replace(' ', '');
      const skill = skillMap[idPrefix];
      if (skill) {
        document.getElementById(`${idPrefix}Current`).value = skill.current;
        document.getElementById(`${idPrefix}Desired`).value = skill.desired;
      }
    });
  }

  document.getElementById('levelModal').style.display = 'block';
}	   

  function openPriorityModal() { /*new*/
  const list = document.getElementById('priorityList');
  list.innerHTML = '';
  const cards = document.querySelectorAll('.character-card');
  cards.forEach((card, index) => {
  const name = card.querySelector('.character-name').textContent;
  const uniqueId = card.getAttribute('id');
  const li = document.createElement('li');
  li.innerHTML = `<strong>${index + 1}.</strong> ${name}`;
  li.draggable = true;
  li.className = 'draggable-item';
  li.dataset.name = name;
  li.dataset.uniqueId = uniqueId;
  list.appendChild(li);
});

  enableDragAndDrop();
  document.getElementById('priorityModal').style.display = 'block';
}

function closePriorityModal() {
  document.getElementById('priorityModal').style.display = 'none';
 document.getElementById('priorityList').innerHTML = ''; // ✅ Clear the list																			   
}


function savePriorityOrder() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) {
    alert("Please enter a username.");
    return;
  }

  let nameOrder = [];

  const listItems = document.querySelectorAll('#priorityList li');
  if (listItems.length > 0) {
    nameOrder = Array.from(listItems).map(li => li.dataset.uniqueId);
  } else {
    // Fallback: use DOM order of character cards
    const cards = document.querySelectorAll('.character-card');
    nameOrder = Array.from(cards).map(card => card.getAttribute('id'));
  }

										
  localStorage.setItem(`priorityOrder_${username}`, JSON.stringify(nameOrder));

  const container = document.getElementById('characterContainer');
  const cards = Array.from(container.children);
  cards.forEach(card => {
																   
    const uniqueId = card.getAttribute('id');
    card.dataset.priority = nameOrder.indexOf(uniqueId);
  });

  updateAllCardsWithPriorityLogic();
  sortCharacterCards();
  closePriorityModal();
  saveUserData();
}




function enableDragAndDrop() { /*new*/
  const list = document.getElementById('priorityList');
  let draggedItem = null;

  list.addEventListener('dragstart', (e) => {
    e.target.classList.add('dragging'); 
    draggedItem = e.target;
    e.target.style.opacity = '1';
  });

  list.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging'); 
    e.target.style.opacity = '';
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null) {
      list.appendChild(draggedItem);
    } else {
      list.insertBefore(draggedItem, afterElement);
    }
  });
}

function getDragAfterElement(container, y) { /*new*/
  const draggableElements = [...container.querySelectorAll('.draggable-item:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

  const activeCategoryFilters = new Set();

function toggleCategoryFilter(category) {
  const button = [...document.querySelectorAll('#categoryFilters button')]
    .find(btn => btn.textContent.toLowerCase() === category);

  if (activeCategoryFilters.has(category)) {
    activeCategoryFilters.delete(category);
    button.classList.remove('active');
  } else {
    activeCategoryFilters.add(category);
    button.classList.add('active');
  }

  openInventoryModal(); // Refresh inventory list
}

function openInventoryModal() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) {
    alert("Please enter a username before opening the inventory.");
    return;
  }

  const modal = document.getElementById('inventoryModal');
  const list = document.getElementById('inventoryList');
  list.innerHTML = '';
  list.style.display = 'flex';
  list.style.flexDirection = 'column';
  list.style.alignItems = 'center';
  list.style.gap = '20px';

  const savedInventory = JSON.parse(localStorage.getItem(`inventoryQuantities_${username}`) || '{}');

  // Create and append Shell Credit separately
  const shellCreditContainer = document.createElement('div');
  shellCreditContainer.style.display = 'flex';
  shellCreditContainer.style.justifyContent = 'center';
  shellCreditContainer.style.marginBottom = '10px';

  const shellItem = 'Shell Credits';
  if (itemMetadata[shellItem]) {
    const container = createItemElement(shellItem, savedInventory[shellItem] || 0);
    shellCreditContainer.appendChild(container);
    list.appendChild(shellCreditContainer);
  }

  // Create a container for the rest of the items
  const itemsGrid = document.createElement('div');
  itemsGrid.style.display = 'flex';
  itemsGrid.style.flexWrap = 'wrap';
  itemsGrid.style.justifyContent = 'center';
  itemsGrid.style.gap = '10px';

  Object.keys(itemMetadata).forEach(item => {
  if (item === shellItem) return;
  if (item === "TBC1") return; 
  if (item === "TBC2") return; 
  if (item === "TBC3") return; 
  if (item === "TBC4") return; 

const category = itemMetadata[item].category;

if (activeCategoryFilters.size > 0 && !activeCategoryFilters.has(category)) return;

  const container = createItemElement(item, savedInventory[item] || 0);
  itemsGrid.appendChild(container);
});

  list.appendChild(itemsGrid);
  modal.style.display = 'block';
}

function createItemElement(item, quantity) {
  const isShellCredit = item === 'Shell Credits';

  const container = document.createElement('div');
  container.style.display = isShellCredit ? 'flex' : 'block';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.gap = isShellCredit ? '0' : '0';
  container.style.width = isShellCredit ? 'auto' : 'auto';
  container.style.textAlign = 'center';

  const img = document.createElement('img');
  img.src = itemMetadata[item]?.image || '';
  img.alt = item;
  img.style.width = '60px';
  img.style.height = '60px';
  // img.style.borderRadius = '6px';
  img.style.objectFit = 'cover';

  const rankColors = {
    0: '#acacac',
    1: '#5cc35e',
    2: '#59b4d3',
    3: '#ca6dff',
    4: '#e8d254'
  };
  const bgColor = rankColors[itemMetadata[item]?.rank] ?? '#eee';
  const bgStyle = `linear-gradient(${bgColor}03 50%, ${bgColor}20 )`;
  const bbStyle = `2px solid ${bgColor}`;

  const imgWrapper = document.createElement('div');
  imgWrapper.style.backgroundImage = bgStyle;
  imgWrapper.style.padding = '3px';
  imgWrapper.style.borderBottom = bbStyle;
  imgWrapper.style.borderRadius = isShellCredit ? '6px 0 0 6px' : '6px 6px 0 0';
  imgWrapper.appendChild(img);

  const input = document.createElement('input');
  input.type = 'number';
  input.min = 0;
  input.value = quantity;
  input.style.width = isShellCredit ? '200px' : '60px';
  input.style.height = isShellCredit ? '65px' : '20px';
  input.style.fontSize = isShellCredit ? '25px' : '15px';
  input.style.textAlign = 'center';
  input.dataset.item = item;
  input.style.color = '#d5bb88';
  input.style.backgroundColor = 'black'; 
  input.style.border = 'solid black';

  if (isShellCredit) {
    const textAndInput = document.createElement('div');
    textAndInput.style.display = 'flex';
    textAndInput.style.flexDirection = 'column';
    textAndInput.style.alignItems = 'flex-start';
									
    textAndInput.appendChild(input);

    container.appendChild(imgWrapper);
    container.appendChild(textAndInput);
  } else {
    container.appendChild(imgWrapper);
								 
    container.appendChild(input);
  }

  return container;
}



function sortCharacterCards() {
  const container = document.getElementById('characterContainer');
  const cards = Array.from(container.children);

  cards.sort((a, b) => {
    const aPriority = parseInt(a.dataset.priority, 10);
    const bPriority = parseInt(b.dataset.priority, 10);
    return aPriority - bPriority;
  });

  cards.forEach(card => container.appendChild(card)); // Reorder in DOM
}

  function closeInventoryModal() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) {
    alert("Please enter a username before closing the inventory.");
    return;
  }
  
  // Clear group filters
  activeCategoryFilters.clear();

  // Remove active class from all group filter buttons
  document.querySelectorAll('#groupFilters button').forEach(btn => {
    btn.classList.remove('active');
  });
  const inputs = document.querySelectorAll('#inventoryList input');
  const inventoryData = {};

  inputs.forEach(input => {
    const item = input.dataset.item;
    const quantity = parseInt(input.value, 10) || 0;
    inventoryData[item] = quantity;
  });

  localStorage.setItem(`inventoryQuantities_${username}`, JSON.stringify(inventoryData));
  document.getElementById('inventoryModal').style.display = 'none';
  updateAllCardsWithPriorityLogic(); 
  //saveUserData(); /*new*/
}

  window.onload = function () {
    // Re-enable the username input
    document.getElementById('usernameInput').disabled = false;

    // Disable all planner buttons
    const buttonIdsToDisable = [
      "inventoryBtn",
      "addCharacterBtn",
      "addWeaponBtn",
      "setPriorityBtn",
      "saveBtn"
    ];

    buttonIdsToDisable.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = true;
      if (btn) btn.style.opacity = '50%';
    });
  }							   
