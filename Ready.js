document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const showFavoritesBtn = document.getElementById('show-favorites');
    const cards = document.querySelectorAll('.card');

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchValue = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const gameName = card.querySelector('.card-info p').textContent.toLowerCase();
            if (gameName.includes(searchValue)) {
                card.style.display = 'block'; // Show card if search query matches
            } else {
                card.style.display = 'none';  // Hide card if search query doesn't match
            }
        });
    });

    // Toggle favorite status
    cards.forEach(card => {
        const favoriteIcon = card.querySelector('.favorite-icon');
        
        favoriteIcon.addEventListener('click', function() {
            const isFavorite = favoriteIcon.getAttribute('data-favorite') === 'true';
            
            // Toggle favorite status
            if (isFavorite) {
                favoriteIcon.textContent = '♡';  // Unfilled heart
                favoriteIcon.setAttribute('data-favorite', 'false');
            } else {
                favoriteIcon.textContent = '♥';  // Filled heart
                favoriteIcon.setAttribute('data-favorite', 'true');
            }
        });
    });

    // Show favorites functionality
    showFavoritesBtn.addEventListener('click', function() {
        cards.forEach(card => {
            const favoriteIcon = card.querySelector('.favorite-icon');
            const isFavorite = favoriteIcon.getAttribute('data-favorite') === 'true';

            if (isFavorite) {
                card.style.display = 'block';  // Show the favorite games
            } else {
                card.style.display = 'none';  // Hide non-favorite games
            }
        });
    });
});

function playGame(gameUrl) {
    window.open(gameUrl, '_blank'); // Opens the Tic-Tac-Toe game in a new tab
}
