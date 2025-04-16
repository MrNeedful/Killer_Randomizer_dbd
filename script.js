document.addEventListener('DOMContentLoaded', () => {
    const numberDisplay = document.querySelector('.number-display');
    const rollButton = document.getElementById('rollButton');
    const perksList = document.getElementById('perksList');
    const addonsList = document.getElementById('addonsList');
    let isRolling = false;

    // Array of DBD killers with their perks and best add-ons (placeholders for now)
    const killers = [
        { name: "Trapper", perks: ["Unnerving Presence", "Brutal Strength", "Agitation", "Hex: Ruin", "Hex: No One Escapes Death"], addons: ["Trapper Sack", "Iridescent Stone"] },
        { name: "Wraith", perks: ["Predator", "Bloodhound", "Shadowborn", "Windstorm", "Coxcomb Clapper"], addons: ["Windstorm - Blood", "Coxcomb Clapper"] },
        { name: "Hillbilly", perks: ["Enduring", "Lightborn", "Tinkerer", "Spirit Fury", "Knock Out"], addons: ["Engraved Chain", "Doom Engravings"] },
        { name: "Nurse", perks: ["Stridor", "Thanatophobia", "A Nurse's Calling", "Infectious Fright", "Hex: Third Seal"], addons: ["Spasmodic Breath", "Fragile Wheeze"] },
        { name: "Huntress", perks: ["Beast of Prey", "Territorial Imperative", "Hex: Huntress Lullaby", "Iron Maiden", "Hex: Devour Hope"], addons: ["Iridescent Head", "Infantry Belt"] },
        { name: "Shape", perks: ["Save the Best for Last", "Play with Your Food", "Dying Light", "Monitor & Abuse", "Hex: Haunted Ground"], addons: ["J. Myers Memorial", "Hairbrush"] },
        { name: "Hag", perks: ["Hex: The Third Seal", "Hex: Ruin", "Hex: Devour Hope", "Hex: Undying", "Hex: Retribution"], addons: ["Swamp Orchid Necklet", "Waterlogged Shoe"] },
        { name: "Doctor", perks: ["Overwhelming Presence", "Monitor & Abuse", "Overcharge", "Surge", "Nemesis"], addons: ["Iridescent King", "Order Class II"] },
        { name: "Cannibal", perks: ["Knock Out", "Barbecue & Chili", "Franklin's Demise", "Hex: Blood Favor", "Hex: Undying"], addons: ["Iridescent Flesh", "Begrimed Chains"] },
        { name: "Nightmare", perks: ["Fire Up", "Remember Me", "Blood Warden", "Hex: No One Escapes Death", "Hex: Plaything"], addons: ["Paint Thinner", "Class Photo"] },
        { name: "Pig", perks: ["Hangman's Trick", "Surveillance", "Make Your Choice", "Hex: Huntress Lullaby", "Hex: Blood Favor"], addons: ["Combat Straps", "Jigsaw's Annotated Plan"] },
        { name: "Clown", perks: ["Bamboozle", "Coulrophobia", "Pop Goes the Weasel", "Hex: Retribution", "Hex: Undying"], addons: ["Redhead's Pinkie Finger", "Ether 15"] },
        { name: "Spirit", perks: ["Spirit Fury", "Hex: Haunted Ground", "Rancor", "Hex: Retribution", "Hex: Undying"], addons: ["Mother-Daughter Ring", "Dried Cherry Blossom"] },
        { name: "Legion", perks: ["Discordance", "Mad Grit", "Iron Maiden", "Hex: No One Escapes Death", "Hex: Plaything"], addons: ["Fuming Mix Tape", "Stab Wounds Study"] },
        { name: "Plague", perks: ["Corrupt Intervention", "Infectious Fright", "Dark Devotion", "Hex: Devour Hope", "Hex: Undying"], addons: ["Black Incense", "Ashen Apple"] },
        { name: "Ghost Face", perks: ["I'm All Ears", "Thrilling Tremors", "Furtive Chase", "Hex: Haunted Ground", "Hex: Retribution"], addons: ["Chewed Pen", "Driver's License"] },
        { name: "Demogorgon", perks: ["Surge", "Mindbreaker", "Cruel Limits", "Hex: Plaything", "Hex: Undying"], addons: ["Red Moss", "Rat Liver"] },
        { name: "Oni", perks: ["Zanshin Tactics", "Blood Echo", "Nemesis", "Hex: Devour Hope", "Hex: Undying"], addons: ["Iridescent Family Crest", "Lion Fang"] },
        { name: "Deathslinger", perks: ["Gearhead", "Dead Man's Switch", "Hex: Retribution", "Hex: Undying", "Hex: Plaything"], addons: ["Warden's Keys", "Hellshire Iron"] },
        { name: "Executioner", perks: ["Forced Penance", "Trail of Torment", "Deathbound", "Hex: Retribution", "Hex: Undying"], addons: ["Burning Man Painting", "Obsidian Goblet"] },
        { name: "Blight", perks: ["Dragon's Grip", "Hex: Blood Favor", "Hex: Undying", "Hex: Plaything", "Hex: Retribution"], addons: ["Blighted Crow", "Compound Thirty-Three"] },
        { name: "Twins", perks: ["Hoarder", "Oppression", "Coup de Grâce", "Hex: Devour Hope", "Hex: Undying"], addons: ["Iridescent Pendant", "Soured Milk"] },
        { name: "Trickster", perks: ["Starstruck", "Hex: Crowd Control", "No Way Out", "Hex: Plaything", "Hex: Undying"], addons: ["Iridescent Photocard", "Fizz-Spin Soda"] },
        { name: "Nemesis", perks: ["Lethal Pursuer", "Hysteria", "Eruption", "Hex: Retribution", "Hex: Undying"], addons: ["T-Virus Sample", "Broken Recovery Coin"] },
        { name: "Cenobite", perks: ["Deadlock", "Hex: Plaything", "Scourge Hook: Gift of Pain", "Hex: Undying", "Hex: Retribution"], addons: ["Engineer's Fang", "Original Pain"] },
        { name: "Artist", perks: ["Grim Embrace", "Scourge Hook: Pain Resonance", "Hex: Pentimento", "Hex: Undying", "Hex: Retribution"], addons: ["Severed Hands", "Thorny Nest"] },
        { name: "Onryō", perks: ["Scourge Hook: Floods of Rage", "Call of Brine", "Merciless Storm", "Hex: Plaything", "Hex: Undying"], addons: ["Mother's Mirror", "Well Stone"] },
        { name: "Dredge", perks: ["Dissolution", "Darkness Revealed", "Septic Touch", "Hex: Plaything", "Hex: Undying"], addons: ["Field Recorder", "Caffeine Tablets"] },
        { name: "Mastermind", perks: ["Superior Anatomy", "Awakened Awareness", "Terminus", "Hex: Plaything", "Hex: Undying"], addons: ["Uroboros Vial", "Jewel Beetle"] },
        { name: "Knight", perks: ["Nowhere to Hide", "Hex: Face the Darkness", "Hubris", "Hex: Plaything", "Hex: Undying"], addons: ["Map of the Realm", "Treated Blade"] },
        { name: "Skull Merchant", perks: ["Game Afoot", "THWACK!", "Leverage", "Hex: Plaything", "Hex: Undying"], addons: ["Geographical Readout", "Ultrasonic Trap Speaker"] },
        { name: "Singularity", perks: ["Genetic Limits", "Forced Hesitation", "Machine Learning", "Hex: Plaything", "Hex: Undying"], addons: ["Nanomachine Gel", "Quantum Bubble"] },
        { name: "Xenomorph", perks: ["Rapid Brutality", "Alien Instinct", "Ultimate Weapon", "Hex: Plaything", "Hex: Undying"], addons: ["Acidic Blood", "Cage Scent"] },
        { name: "Good Guy", perks: ["Hex: Two Can Play", "Friends 'Til The End", "Batteries Included", "Hex: Plaything", "Hex: Undying"], addons: ["Good Guy Hammer", "Good Guy Ruler"] },
        { name: "The Ghoul", perks: ["Ghastly Pursuit", "Spectral Grasp", "Haunting Presence", "Hex: Plaything", "Hex: Undying"], addons: ["Ectoplasmic Veil", "Ghoul's Claw"] }
    ];

    // Gather all unique perks from all killers
    const allPerks = Array.from(new Set(killers.flatMap(k => k.perks)));

    function getRandomPerks(perks, count = 4) {
        const shuffled = [...perks].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function rollKiller() {
        if (isRolling) return;
        isRolling = true;

        // Duration of the rolling animation in milliseconds
        const rollDuration = 2000;
        const startTime = Date.now();

        function getRandomKiller() {
            return killers[Math.floor(Math.random() * killers.length)];
        }

        function updateRoll() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;

            if (elapsed < rollDuration) {
                // Show random killers during the roll
                const randomKiller = getRandomKiller();
                numberDisplay.textContent = randomKiller.name;
                perksList.innerHTML = '';
                addonsList.innerHTML = '';
            } else {
                // Show the final killer, 4 random perks, and 2 best add-ons
                const finalKiller = getRandomKiller();
                numberDisplay.textContent = finalKiller.name;
                const randomPerks = getRandomPerks(allPerks);
                perksList.innerHTML = '';
                randomPerks.forEach(perk => {
                    const li = document.createElement('li');
                    li.textContent = perk;
                    perksList.appendChild(li);
                });
                // Show the best 2 add-ons for the killer
                addonsList.innerHTML = '';
                finalKiller.addons.slice(0, 2).forEach(addon => {
                    const li = document.createElement('li');
                    li.textContent = addon;
                    addonsList.appendChild(li);
                });
                isRolling = false;
            }

            if (elapsed < rollDuration) {
                requestAnimationFrame(updateRoll);
            }
        }

        updateRoll();
    }

    rollButton.addEventListener('click', rollKiller);
}); 