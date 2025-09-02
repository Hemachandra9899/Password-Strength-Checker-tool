// Password strength checker function
function checkPasswordStrength(password) {
    // Initialize score
    let score = 0;

    // Check length: Minimum length 8 characters
    if (password.length >= 8) {
        score += 20;  // Length adds 20 points
    }

    // Check for variety: lowercase, uppercase, number, special character
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[\W_]/.test(password);

    if (hasLowerCase) score += 10;
    if (hasUpperCase) score += 10;
    if (hasDigit) score += 10;
    if (hasSpecialChar) score += 10;

    // Check for common patterns
    const commonPatterns = ['123456', 'password', 'qwerty', 'abcdef', 'letmein'];
    for (let pattern of commonPatterns) {
        if (password.toLowerCase().includes(pattern)) {
            score -= 10; // Deduct points for common patterns
        }
    }

    // Check for entropy (basic randomness)
    let entropy = (new Set(password)).size * password.length;
    if (entropy < 60) {
        score += 10;
    } else if (entropy < 120) {
        score += 20;
    } else {
        score += 30;
    }

    // Normalize the score to a max of 100
    score = Math.min(score, 100);

    return score;
}

// Function to generate password suggestions
function generatePasswordSuggestions() {
    return [
        "Example!23@Password",
        "StrongPass@2025",
        "S3cur3Passw0rd!",
        "MyStr0ng#Pwd123",
        "P@ssw0rD_2025"
    ];
}

// Function to handle the input and update strength message
document.getElementById('passwordInput').addEventListener('input', function() {
    const password = this.value;
    const strength = checkPasswordStrength(password);
    const strengthMessage = document.getElementById('strengthMessage');
    const scoreMessage = document.getElementById('scoreMessage');
    const suggestions = document.getElementById('suggestions');

    // Determine the strength text based on the score
    let strengthText;
    if (strength < 40) {
        strengthText = "Very Weak";
        strengthMessage.className = "strength very-weak";
    } else if (strength < 60) {
        strengthText = "Weak";
        strengthMessage.className = "strength weak";
    } else if (strength < 80) {
        strengthText = "Medium";
        strengthMessage.className = "strength medium";
    } else if (strength < 90) {
        strengthText = "Strong";
        strengthMessage.className = "strength strong";
    } else {
        strengthText = "Very Strong";
        strengthMessage.className = "strength very-strong";
    }

    // Update the strength and score message
    strengthMessage.textContent = `Strength: ${strengthText}`;
    scoreMessage.textContent = `Score: ${strength}`;

    // Display password suggestions
    const passwordSuggestions = generatePasswordSuggestions();
    suggestions.innerHTML = `<strong>Suggestions for stronger passwords:</strong><ul>${passwordSuggestions.map(pwd => `<li>${pwd}</li>`).join('')}</ul>`;
});
