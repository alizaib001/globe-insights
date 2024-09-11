export function capitalizeEachWord(input: string): string {
    // Split the input string into an array of words
    const words = input.split(' ');
    
    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
      if (word.length === 0) return word; // Handle empty words
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    
    // Join the words back into a single string
    return capitalizedWords.join(' ');
  }
  