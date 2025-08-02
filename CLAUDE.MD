# Connections Game Clone - Development Instructions

Create a fully functional clone of the New York Times Connections game using React 19 and Tailwind CSS. Which we will call Interconnections.

## Game Overview
Connections is a word puzzle game where players must identify four groups of four related words from a grid of 16 words. Each group has a different difficulty level indicated by color.

## Technical Requirements

### Technology Stack
- React 19 with hooks (useState, useEffect)
- React Router DOM for URL-based puzzle sharing
- Tailwind CSS for styling
- No external APIs or databases
- Local JSON file system for puzzles (106 puzzles available)

### File Structure
```
src/
├── components/
│   ├── ConnectionsGame.jsx
│   ├── WordGrid.jsx
│   ├── CategoryResult.jsx
│   ├── GameControls.jsx
│   └── RandomPuzzleRedirect.jsx
├── utils/
│   └── puzzleLoader.js
└── App.jsx

public/
└── puzzles/
    ├── d7829759-c5fe-434a-ad38-8aee6e545df2.json
    └── [105 other puzzle GUIDs].json
```

### Puzzle JSON Format
Each puzzle file should be named with a GUID and contain:
```json
{
  "id": "d7829759-c5fe-434a-ad38-8aee6e545df2",
  "date": "2025-08-01"
  "items": [
    {
      "name": "Keyboard Words",
      "words": [ "Command", "Return", "Shift", "Escape" ]
    },
    {
      "name": "Seen during easter",
      "words": [ "Bunny", "Egg", "Peep", "Jelly Bean" ]
    },
    {
      "name": "Johns",
      "words": [ "Carpenter", "Candy", "Major", "Legend" ]
    },
    {
      "name": "Bit of advice",
      "words": [ "Pointer", "Suggestion", "Tip", "Trick" ]
    }
  ]
}
```

## Game Mechanics

### Core Functionality
1. **Word Selection**: Players can select up to 4 words by clicking them
2. **Submission**: Submit button becomes active when exactly 4 words are selected
3. **Validation**: Check if selected words form a correct group
4. **Mistakes**: Track wrong attempts (maximum 4 mistakes allowed)
5. **One Away Detection**: Shows toast notification when 3/4 words are correct, keeping selections
6. **Success**: Remove correct groups and display them with category names
7. **Shuffle**: Randomize word positions while maintaining game state
8. **Deselect All**: Clear all current selections
9. **Random Puzzle**: Load a different random puzzle (excludes current puzzle)
10. **URL Sharing**: Each puzzle has a unique URL for sharing specific puzzles

### Game States
- **Playing**: Normal gameplay state
- **Won**: All categories found successfully  
- **Lost**: 4 mistakes made without completing puzzle

### Selection Logic
- Words should visually indicate when selected (darker background)
- Maximum 4 words can be selected at once
- Clicking a selected word should deselect it
- Submit button only active with exactly 4 selections

## UI/UX Requirements

### Visual Design
- **Color Scheme**: 
  - Easiest group: Light green background
  - Second easiest: Light purple/pink background  
  - Second hardest: Light yellow background
  - Hardest: Light blue background
  - Victory message: Gray background (not green to avoid conflict)
- **Word Grid**: 4x4 responsive grid of clickable word buttons
- **Found Categories**: Display above the grid when discovered
- **Game Controls**: Shuffle, Deselect All, and Submit buttons
- **Mistakes Indicator**: Visual dots showing remaining mistakes
- **Puzzle Info**: Shows full GUID with Random Puzzle button below
- **Toast Notifications**: Slide-down toast for "One away!" messages

### Responsive Design
- Mobile-first approach
- Grid should adapt to different screen sizes
- Buttons should be touch-friendly
- Maintain game playability on all devices

### Animations/Transitions
- Smooth color transitions for word selection
- Category reveal animations when groups are found
- Button hover and active states
- Mistake indicator updates

## Detailed Component Requirements

### Main Game Component (ConnectionsGame.jsx)
- Manage overall game state (selected words, found categories, mistakes)
- Load puzzle data from JSON files
- Handle game logic and validation
- Coordinate between child components

### Word Grid Component (WordGrid.jsx)
- Render 4x4 grid of word buttons
- Handle word selection/deselection
- Apply visual states (selected, found, available)
- Implement shuffle functionality while preserving selections

### Category Result Component (CategoryResult.jsx)
- Display found categories with appropriate difficulty colors
- Show category names and associated words
- Animate in when categories are discovered

### Game Controls Component (GameControls.jsx)
- Shuffle button (randomize unfound words)
- Deselect All button (clear current selections)
- Submit button (validate current selection)
- Button states based on game progress

### Utility Functions (puzzleLoader.js)
- `loadPuzzle(puzzleId)`: Load specific puzzle JSON file with fallback
- `getAvailablePuzzleIds()`: Return array of all 106 puzzle GUIDs
- `getRandomPuzzleId(excludeId)`: Get random puzzle ID excluding current
- `shuffleArray()`: Fisher-Yates shuffle implementation
- Data validation for puzzle format

## Game Flow

### Initial Load
1. Home route ("/") automatically redirects to random puzzle URL
2. Load specific puzzle from URL parameter (/puzzle/[guid])
3. Shuffle the word order randomly
4. Initialize game state (0 mistakes, no selections, no found categories)

### During Gameplay
1. Player clicks words to select (max 4)
2. Submit button activates when exactly 4 words selected
3. On submit, validate if selection forms a correct group
4. If correct: remove from grid, show category, continue
5. If incorrect: 
   - If 3/4 words match a category: show "One away!" toast, keep selections
   - Otherwise: increment mistakes, deselect all, continue
6. Game ends when all categories found (win) or 4 mistakes (lose)

### End States
- **Victory**: All categories revealed, celebratory message
- **Defeat**: 4 mistakes reached, reveal all correct answers

## Implementation Details

### State Management
Use React hooks to manage:
- `selectedWords`: Array of currently selected words
- `foundCategories`: Array of discovered category objects
- `words`: Array of words still in play
- `mistakes`: Number of incorrect submissions (0-4)
- `gameStatus`: 'playing' | 'won' | 'lost'
- `puzzle`: Loaded puzzle data
- `oneAwayMessage`: Toast notification state
- `loading`: Loading state during puzzle fetch

Use React Router hooks:
- `useParams()`: Get puzzle ID from URL
- `useNavigate()`: Navigate between puzzles

### Word Validation Logic
- Compare selected words against all category word arrays
- Account for any word order in selections
- Return category information if match found
- Handle edge cases (duplicate selections, invalid states)

### Shuffle Algorithm
- Randomize only remaining (unfound) words
- Preserve found category positions/styling
- Maintain current selections after shuffle
- Use Fisher-Yates or similar algorithm for true randomness

## Styling Guidelines

### Tailwind CSS Classes
- Use responsive grid classes (`grid-cols-4`, `gap-2`, etc.)
- Implement hover and focus states
- Use color utilities for category difficulty levels
- Apply consistent spacing and typography
- Ensure accessibility with proper contrast ratios

### Component Styling
- Clean, modern design matching NYT aesthetic
- Subtle shadows and rounded corners
- Clear visual hierarchy
- Consistent button styling across components

## Puzzle Generation Rules

When creating new puzzles for Interconnections, **STRICT ADHERENCE** to these rules is required to ensure game functionality and quality:

### 🚨 Critical Requirements (Game-Breaking if Violated)

1. **NO DUPLICATE WORDS**: Each puzzle must contain exactly 16 unique words
   - Each word can appear only ONCE per puzzle
   - Duplicates make puzzles unsolvable (game cannot determine correct category)
   - Always validate: flatten all words and check for duplicates

2. **EXACT WORD COUNT**: Each category must have exactly 4 words
   - No more, no less than 4 words per category
   - Total of 16 words per puzzle across 4 categories

3. **UNIQUE GUID**: Each puzzle file must have a unique GUID as filename and id
   - Use proper GUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - Never reuse existing GUIDs from the 106 current puzzles

### 📋 Quality Standards

4. **CLEAR CATEGORIZATION**: All 4 words in a category must be clearly related
   - Avoid ambiguous connections that could fit multiple categories
   - Ensure average players can understand the connection
   - Test: "Would a player reasonably group these 4 words together?"

5. **NO CROSS-CATEGORY OVERLAP**: Words should not fit multiple categories
   - Example: Avoid "Apple" in both "Fruits" and "Tech Companies"
   - Each word should have one clear, obvious category home

6. **APPROPRIATE DIFFICULTY PROGRESSION**: Categories should vary in difficulty
   - Mix obvious connections with more challenging ones
   - Avoid making all categories too easy or impossibly hard

7. **CULTURAL ACCESSIBILITY**: Use broadly known references
   - Prefer common knowledge over niche expertise
   - Avoid extremely regional or time-sensitive references
   - Consider international audience familiarity

### 🎯 Theme Guidelines

8. **DIVERSE THEMES**: Create varied, engaging categories such as:
   - **Word Play**: Compound words, rhyming words, words ending in same suffix
   - **Pop Culture**: Movies, music, TV shows, celebrities (but not too niche)
   - **everyday Objects**: Kitchen items, school supplies, clothing
   - **Academic**: Science terms, historical figures, geography
   - **Abstract Concepts**: Colors, emotions, time periods

9. **THEMATIC CONSISTENCY**: Within each category, maintain coherent themes
   - "Types of Pasta" not "Italian Things" (too broad)
   - "Olympic Sports" not "Sports" (more specific is better)

10. **BALANCED DIFFICULTY**: Aim for one category per difficulty level:
    - **Green (Easiest)**: Very obvious connections
    - **Purple (Medium)**: Moderately challenging 
    - **Yellow (Hard)**: Requires thought or knowledge
    - **Blue (Hardest)**: Clever wordplay or subtle connections

### 🔧 Technical Implementation

11. **PROPER JSON FORMAT**: Follow exact structure:
```json
{
  "id": "unique-guid-here",
  "date": "YYYY-MM-DD",
  "items": [
    {
      "name": "Category Name",
      "words": ["Word1", "Word2", "Word3", "Word4"]
    }
  ]
}
```

12. **UPDATE PUZZLE LOADER**: Add new puzzle GUIDs to `getAvailablePuzzleIds()` in `puzzleLoader.js`

13. **VALIDATION CHECKLIST**: Before submitting any puzzle, verify:
    - [ ] Exactly 16 unique words (no duplicates)
    - [ ] 4 categories with 4 words each
    - [ ] Unique GUID used for filename and id
    - [ ] All words clearly belong to their assigned category
    - [ ] No words could reasonably fit multiple categories
    - [ ] JSON is properly formatted and valid
    - [ ] Category names are descriptive and accurate

### ⚠️ Common Pitfalls to Avoid

- **Homonyms/Homophones**: Words with multiple meanings that could confuse categorization
- **Proper Nouns**: Overly specific names that may not be universally known
- **Ambiguous Words**: Terms that could reasonably fit 2+ categories
- **Inconsistent Difficulty**: All categories being too easy or too hard
- **Cultural Bias**: References that exclude international players
- **Temporal Sensitivity**: References that will become outdated quickly

**Remember**: Quality over quantity. A smaller number of well-crafted, tested puzzles is infinitely better than many puzzles with quality issues.

## Testing Considerations
- Test with various puzzle configurations
- Verify shuffle maintains game state correctly
- Ensure responsive design works across devices
- Test edge cases (rapid clicking, invalid selections)
- Validate accessibility features (keyboard navigation, screen readers)
- **CRITICAL**: Test new puzzles for duplicate words and solvability

## Implemented Features
✅ **URL-based puzzle sharing**: Each puzzle has unique shareable URL
✅ **Random puzzle selection**: Home page redirects to random puzzle
✅ **One away detection**: Smart feedback when close to correct answer
✅ **Toast notifications**: Slide-down animations for user feedback
✅ **106 diverse puzzles**: Wide variety of themes and difficulty levels
✅ **Smart word selection**: Maintains selections for "one away" scenarios
✅ **Responsive design**: Works on all device sizes
✅ **React Router integration**: Clean URL structure for sharing

## Future Enhancements (Optional)
- Daily puzzle rotation based on date
- Score tracking and statistics
- Hint system for difficult categories
- Social sharing of results with visual cards
- Multiple difficulty levels
- Puzzle creation tools
- Copy confirmation toast for sharing
- Keyboard navigation support

## Success Criteria
The completed game should:
1. Load puzzles from local JSON files successfully
2. Provide intuitive word selection and submission
3. Correctly validate category matches
4. Display found categories with proper styling
5. Track mistakes and end game appropriately
6. Allow shuffling and deselection functionality
7. Work responsively across all device sizes
8. Match the visual design and feel of the original Connections game

Create a polished, fully functional Connections game clone that captures the engaging puzzle-solving experience of the original while maintaining clean, maintainable code structure.