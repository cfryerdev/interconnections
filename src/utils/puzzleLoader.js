export const loadPuzzle = async (puzzleId = 'd7829759-c5fe-434a-ad38-8aee6e545df2') => {
  try {
    const response = await fetch(`/puzzles/${puzzleId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load puzzle: ${response.status}`);
    }
    const puzzle = await response.json();
    
    if (!validatePuzzle(puzzle)) {
      throw new Error('Invalid puzzle format');
    }
    
    return puzzle;
  } catch (error) {
    console.error('Error loading puzzle:', error);
    return getDefaultPuzzle();
  }
};

const validatePuzzle = (puzzle) => {
  if (!puzzle || !puzzle.id || !puzzle.items || !Array.isArray(puzzle.items)) {
    return false;
  }
  
  if (puzzle.items.length !== 4) {
    return false;
  }
  
  return puzzle.items.every(item => 
    item.name && 
    Array.isArray(item.words) && 
    item.words.length === 4
  );
};

const getDefaultPuzzle = () => ({
  id: 'd7829759-c5fe-434a-ad38-8aee6e545df2',
  date: '2025-08-01',
  items: [
    {
      name: 'Keyboard Words',
      words: ['Command', 'Return', 'Shift', 'Escape']
    },
    {
      name: 'Seen during easter',
      words: ['Bunny', 'Egg', 'Peep', 'Jelly Bean']
    },
    {
      name: 'Johns',
      words: ['Carpenter', 'Candy', 'Major', 'Legend']
    },
    {
      name: 'Bit of advice',
      words: ['Pointer', 'Suggestion', 'Tip', 'Trick']
    }
  ]
});

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getAvailablePuzzleIds = () => {
  return [
    'd7829759-c5fe-434a-ad38-8aee6e545df2',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'b2c3d4e5-f6g7-8901-bcde-f23456789012',
    'c3d4e5f6-g7h8-9012-cdef-345678901234',
    'd4e5f6g7-h8i9-0123-defg-456789012345',
    'e5f6g7h8-i9j0-1234-efgh-567890123456',
    'ef2791b4-3570-4266-b62f-4ab2c49e8cf5',
    'ff4db81f-2df2-4c52-b854-40de254dd366',
    '6341865d-40ee-4802-a9da-124fcbd5db64',
    'ff5d1ce3-14bd-4f5d-873e-e367a9135e9d',
    '2b2a4645-20b3-48c2-889a-6be9be4a63ac',
    '9a54dfd5-c3f7-4c68-bfa2-7ad29badcf2f',
    'f44fb329-b53b-4605-a099-6065a5d6c868',
    '78486a9d-8f92-461b-918f-a02527362602',
    '25bddec6-761c-4b71-a40a-55f860488d2e',
    'c23b1973-5b0b-4021-a782-3dd788bfd896',
    'ea834797-9bd3-452a-93b0-2785355fc014',
    'ce9e0ffd-cc83-4e72-b3f0-11387d662433',
    'c9c2d8a5-224c-4b25-baf4-fe71c18f2d5b',
    '30605c5f-4412-4878-b484-b8f342d9f031',
    'ef6af7f1-f276-4820-b3b2-5e25cbe4e488',
    '1a9e086e-da67-4c59-8030-725da05896ac',
    '06bc3faa-4b36-4ad5-9d43-65d526c52f1e',
    '87b6afd4-ee79-4e90-8341-124d1887c07e',
    '33ed7d10-497a-4d1a-a199-c237161a8211',
    'ea95fd8e-9508-484d-a2e0-2e84e84854ea',
    '8d2bec73-7ef0-4ae5-b5b6-6657dfc29b0e',
    '0542244a-4d41-412b-b150-88a8f4de0b61',
    '595f99cf-5efb-4862-8641-c051f5ebb029',
    '4c084326-a286-4046-84e8-9bfd204eaca7',
    '1539f8fc-c243-4720-b2e4-908b6d43c288',
    '16b31f74-1e44-4a13-81cd-e4a1bbb74685',
    '00c1896d-5620-4bf8-bfef-6e287d0b9271',
    'ebdee408-22f7-4ea6-bfd6-28192dd84f3a',
    '5e10401d-c10d-4d9f-8e69-f4172a03c468',
    '80fd8811-a3b1-426b-9f9a-1c78e299e12e',
    '7b220f3d-4530-4881-bf48-8d689c597261',
    '0218237d-5c80-4d58-a957-55b4ae3e7d68',
    'e4a119b0-1a61-4abe-a1f4-680980be1e2c',
    '5dc2cd14-b352-4ccc-bcbf-2666b6ed0ed7',
    '4556d7ed-7c4a-4f59-866d-1197f747b8c5',
    'e3bafbea-7068-447d-8e55-ea11a0b9e419',
    'f44f270b-d9b1-452e-a752-688318d519c4',
    'af9b4add-e81c-485d-85bc-56a943ab6c02',
    'ccfaeff1-fc9b-4a8c-8ab0-af59fb2715fc',
    '105d31c8-7b09-48e9-8247-e8faa9e79875',
    '9f748f40-8809-446d-93b7-9827b19f8bcd',
    '7936c5b5-55cd-4586-8186-397fedaffe87',
    'e684d82b-1a4c-441f-92dc-bed5b4ef1f95',
    '3ca90cf4-e3c1-4f4c-8893-3edd486c8c59',
    '85e99b01-8c70-442f-961b-c505f34180f8',
    '7552d3a7-d46a-49db-a5d2-41785b130c18',
    '503f5a99-2fce-4233-b954-10dde17c28e9',
    'db50df2e-c72d-4a3e-bc0e-ce1b1554f04f',
    'b46ce1bd-6701-46f7-9fd1-173f80cbdb25',
    '96614873-c8fc-41d0-ab91-12fd6d707e4a',
    '6b02dab3-ab88-4e11-8814-b7dfeb66a9b7',
    '1687cf07-4ed0-4d0d-b461-2aad2831945d',
    'a25879a2-9831-410b-8e07-f3ad8d3718f5',
    '3dfa621c-ffd5-410b-8a1b-050410392bda',
    'df344d18-800f-4d7d-a720-83a36858817b',
    'fc33f9d5-7038-4a31-b267-a55b9142744a',
    '55874d65-acc4-4c40-a685-c1708eea2cae',
    '0fc3b767-847c-4a2e-b407-8a297835d542',
    '1eaae458-929e-498b-a268-23f1c4e6f6ab',
    'd2b7cd31-75f6-4d5f-9ddf-f3a3d2ec6503',
    '7c7b4ded-c69d-4a84-abae-8d99eec1de16',
    '1136dacb-1e2a-4a35-bcb5-8d7f5bda420a',
    '7c0c59a1-bd02-45fe-a3c8-c9deb5132fc3',
    'f287841f-1f9b-42e6-aac4-769d4c4d9d27',
    'c9fd2f2e-fa4a-4fb1-a811-3c9f1259506e',
    '31548ed3-5d11-4b97-a0bc-4cc49c0b48e2',
    '19983179-a87e-4c4a-b2e5-7374c477ec12',
    'ca76fabd-116e-48ed-a5a8-cb228b18da39',
    'ab2ca5b4-e68c-4386-ac42-b688e45a89cc',
    '96b2e290-4413-4090-a8f5-b17004520a92',
    '644e7ccd-5f6c-45c9-bc3e-018b6629981b',
    '0aa470f3-ba87-4126-af98-192d3aa22f52',
    '602fbe75-2da4-4c37-8e8b-f2fb6fed121f',
    'd62ed88d-749f-4661-bc0c-8379f4ff33ef',
    '4e994b26-ccb2-4a07-93eb-d3bc89ea79f9',
    'dfb2470e-9dec-454c-9c04-81a389750cc7',
    '6554b7ae-05f6-497a-a3cf-c861d6b1ba5d',
    'f160a439-3198-4b0f-92c1-3b3c0d1c06a6',
    '5ad52f25-0731-4157-a0fb-82d88e4d8da1',
    '74266582-f9e6-477e-b599-eba5ff48d33d',
    '2c162fa7-0753-4c10-84e5-2fead50046d9',
    '466c79e8-139b-4a5c-a873-daab814038c5',
    'bc2fab38-17d8-4204-8b85-4ea19c978b87',
    '9fad185f-381f-465d-8359-0270e93b21a8',
    '9a703427-cbe3-425e-9a31-b690e372b252',
    '92603b4d-a36f-4611-9d13-a1fa05ce7b68',
    '213952e8-d7d5-4329-a2a0-42db3dcc6dc4',
    '8a032f9d-f20d-4023-941d-33459d144073',
    '01db02ba-467b-430c-8a8d-3f446e29d295',
    '0968e86f-5f85-44a3-a7c1-0c544e9f788a',
    'dd304318-3b1e-4c65-a481-05c3b9f0d9c0',
    '53ea8ec5-80e1-400f-a6dd-a6689d8f72e0',
    '7b607747-e3d4-4f9d-ac78-46f673aaff87',
    'c38c0969-9c15-4ed2-a55a-616226b3f7de',
    'd2e67541-b23d-4829-961b-3b13f8e3a06a',
    '3b8594dd-5080-479f-a7ce-b2f3a289746e',
    '7bb23c41-b371-4555-a7d3-fbeeb6dd974a',
    'c96d479a-c448-45ce-9a76-5136fc6fca25',
    'c9af7a55-7231-4ebc-8be7-52db3b57e1a6',
    '9317aef4-6087-4668-b0ad-25b1bf87f240'
  ];
};

export const getRandomPuzzleId = (excludeId = null) => {
  const puzzleIds = getAvailablePuzzleIds();
  const availableIds = excludeId ? puzzleIds.filter(id => id !== excludeId) : puzzleIds;
  
  if (availableIds.length === 0) {
    return puzzleIds[Math.floor(Math.random() * puzzleIds.length)];
  }
  
  return availableIds[Math.floor(Math.random() * availableIds.length)];
};