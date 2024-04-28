document.addEventListener("DOMContentLoaded", function () { // Wartet darauf, dass das  Document Object Model vollständig geladen ist, bevor das Skript ausgeführt wird
    const board = document.getElementById("board"); // Holt sich das Spielfeld-Element aus dem  Document Object Model
    const cells = Array.from({ length: 9 }, (_, index) => { // ANzahl der Zellen 
        const cell = document.createElement("div"); // Erstellt eine neue Zelle (Div-Element)
        cell.classList.add("cell"); // Fügt der Zelle die Klasse "cell" hinzu
        cell.dataset.index = index; 
        board.appendChild(cell); // Fügt die Zelle dem Spielfeld hinzu
        return cell; // Gibt die erstellte Zelle aus
    });

    let currentPlayer = "X"; // Setzt den aktuellen Spieler auf "X"
    let gameEnded = false; // Setzt das Spielende auf nicht eingetroffen
    const replayButton = document.getElementById("replay-button"); // Holt sich den Replay-Button aus dem Document Object Model

    replayButton.addEventListener("click", resetBoard); // Fügt einen Event-Listener zum Replay-Button hinzu, der das Spiel zurücksetzt

    board.addEventListener("click", function (event) { // Fügt einen Event-Listener zum Spielfeld hinzu, der auf Zellenklicks reagiert
        if (!gameEnded && event.target.classList.contains("cell")) { // Überprüft, ob das Spiel nicht beendet ist und ob das Ziel des Ereignisses eine Zelle ist
            handleCellClick(event); // Behandelt den Zellenklick
        }
    });
    
    
    function handleCellClick(cell) {
        cell.style.transform = 'scale(0.95)'; // Zelle kleiner machen
        cell.style.backgroundColor = '#494949'; // Hintergrundfarbe ändern

        // Füge eine Verzögerung hinzu, um die Animation zu sehen
        setTimeout(function() {
            cell.style.transform = ''; // Setze die Transformation zurück
        }, 200);
    }
    
    function handleCellClick(event) { // Behandelt Zellenklick-Ereignisse
        const cell = event.target; // Holt sich die angeklickte Zelle
        const index = cell.dataset.index; // Holt sich den Datensatz-Index der Zelle

        if (!cell.textContent) { // Überprüft, ob die Zelle leer ist
            cell.textContent = currentPlayer; // Setzt den Inhalt der Zelle auf den aktuellen Spieler

            if (checkWinner()) { // Überprüft, ob es einen Gewinner gibt
                highlightWinner(); // Hervorhebung des Gewinners
                showWinnerMessage(currentPlayer); // Zeigt die Gewinnnachricht an
                gameEnded = true; // Setzt das Spielende auf eingetroffen
                replayButton.style.display = "block"; // Zeigt den Replay-Button an
                replayButton.disabled = false; // Aktiviert den Replay-Button
            } else if (checkDraw()) { // Überprüft, ob das Spiel unentschieden ist
                showDrawMessage(); // Zeigt die Unentschieden-Nachricht an
                gameEnded = true; // Setzt das Spielende auf eingetroffen
                replayButton.style.display = "block"; // Zeigt den Replay-Button an
                replayButton.disabled = false; // Aktiviert den Replay-Button
            } else { // Wenn das Spiel nicht gewonnen und nicht unentschieden ist
                currentPlayer = currentPlayer === "X" ? "O" : "X"; // Wechselt den aktuellen Spieler
            }
        }
    }

    function checkWinner() { // Überprüft, ob es einen Gewinner gibt
        const winningCombinations = [ // Mögliche Gewinnkombinationen im Tic-Tac-Toe
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombinations) { 
            const [a, b, c] = combo; 
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) { // Überprüft, ob die Zellen in der Kombination gleich sind und nicht leer sind
                return combo; // Gibt die Gewinnkombination zurück
            }
        }

        return null; // Gibt nichts zurück, wenn es keinen Gewinner gibt
    }

    function checkDraw() { // Überprüft, ob das Spiel unentschieden ist
        return cells.every(cell => cell.textContent); // Gibt true zurück, wenn alle Zellen gefüllt sind und es keinen Gewinner gibt, sonst false
    }

    function highlightWinner() { // Hervorhebung des Gewinners
        const winningCombo = checkWinner(); // Holt sich die Gewinnkombination
        if (winningCombo) { // Wenn es eine Gewinnkombination gibt
            const [a, b, c] = winningCombo; 
            cells[a].classList.add("chroma"); // Fügt der ersten Zelle der Gewinnkombination die Klasse "chroma" hinzu
            cells[b].classList.add("chroma"); // ...
            cells[c].classList.add("chroma"); // ...
        }
    }

    function showWinnerMessage(winner) { // Zeigt die Gewinnnachricht an
        result.textContent = `Spieler ${winner} hat gewonnen!`; // Setzt den Text des Ergebnis-Elements auf die Gewinnnachricht
    }

    function showDrawMessage() { // Zeigt die Unentschieden-Nachricht an
        result.textContent = "Das Spiel ist unentschieden!"; // Setzt den Text des Ergebnis-Elements auf die Unentschieden-Nachricht
    }

    function resetBoard() { // Setzt das Spielfeld zurück
        cells.forEach(cell => { 
            cell.textContent = ""; // Leert den Inhalt der Zelle
            cell.classList.remove("chroma"); // Entfernt die Klasse "chroma" von der Zelle
        });
        result.textContent = ""; // Setzt den Text des Ergebnis-Elements zurück
        currentPlayer = "X"; // Setzt den aktuellen Spieler auf "X"
        gameEnded = false; // Setzt das Spielende auf nicht eingetroffen
        replayButton.style.display = "none"; // Blendet den Replay-Button aus
        replayButton.disabled = true; // Deaktiviert den Replay-Button
    }
    });
