// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Cursor Trail Effect
const cursorTrail = document.getElementById('cursor-trail');
let lastTime = 0;
const throttleDelay = 30; // milliseconds

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    if (currentTime - lastTime < throttleDelay) return;
    lastTime = currentTime;

    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = e.pageX + 'px';
    particle.style.top = e.pageY + 'px';
    cursorTrail.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 800);
});

// Field labels for sidebar
const fieldLabels = {
    protagonistName: 'Name',
    coreEssence: 'Core Essence',
    falseBelief: 'False Belief',
    skill: 'Skill',
    relationships: 'Relationships',
    superlative: 'High School',
    antagonist: 'Antagonist',
    present: 'Presents As',
    inside: 'Inside',
    personalityScale: 'Intro/Extro Scale',
    enneagram: 'Enneagram',
    order: 'Order/Equilibrium',
    chaos: 'Chaos/Imbalance',
    statusQuo: 'Status Quo',
    catalyst: 'Catalyst',
    opportunity: 'Opportunity',
    problem: 'Problem',
    want: 'Want',
    obstacle: 'Obstacle',
    stakes: 'Stakes',
    cdq: 'Central Question',
    bestCase: 'Best Case',
    worstCase: 'Worst Case',
    act1Home: 'Act 1',
    act2Road: 'Act 2',
    act3Worst: 'Act 3',
    externalDominant: 'Ext. Stakes (Dom)',
    externalUnderdog: 'Ext. Stakes (Und)',
    internalDominant: 'Int. Stakes (Dom)',
    internalUnderdog: 'Int. Stakes (Und)',
    philosophicalDominant: 'Phil. Stakes (Dom)',
    philosophicalUnderdog: 'Phil. Stakes (Und)'
};

// Form field references
const fields = {
    protagonistName: document.getElementById('protagonist-name'),
    coreEssence: document.getElementById('core-essence'),
    falseBelief: document.getElementById('false-belief'),
    skill: document.getElementById('skill'),
    relationships: document.getElementById('relationships'),
    superlative: document.getElementById('superlative'),
    antagonist: document.getElementById('antagonist'),
    present: document.getElementById('present'),
    inside: document.getElementById('inside'),
    personalityScale: document.getElementById('personality-scale'),
    enneagram: document.getElementById('enneagram'),
    order: document.getElementById('order'),
    chaos: document.getElementById('chaos'),
    statusQuo: document.getElementById('status-quo'),
    catalyst: document.getElementById('catalyst'),
    opportunity: document.getElementById('opportunity'),
    problem: document.getElementById('problem'),
    want: document.getElementById('want'),
    obstacle: document.getElementById('obstacle'),
    stakes: document.getElementById('stakes'),
    cdq: document.getElementById('cdq'),
    bestCase: document.getElementById('best-case'),
    worstCase: document.getElementById('worst-case'),
    act1Home: document.getElementById('act1-home'),
    act2Road: document.getElementById('act2-road'),
    act3Worst: document.getElementById('act3-worst'),
    externalDominant: document.getElementById('external-dominant'),
    externalUnderdog: document.getElementById('external-underdog'),
    internalDominant: document.getElementById('internal-dominant'),
    internalUnderdog: document.getElementById('internal-underdog'),
    philosophicalDominant: document.getElementById('philosophical-dominant'),
    philosophicalUnderdog: document.getElementById('philosophical-underdog')
};

const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const downloadBtn = document.getElementById('download-btn');
const sidebarContent = document.getElementById('sidebar-content');

// Intelligent hints system - shows how fields are interconnected
const fieldConnections = {
    coreEssence: {
        helps: ['falseBelief', 'inside', 'want'],
        hints: (values) => {
            const hints = [];
            if (values.coreEssence && !values.falseBelief) {
                hints.push("Your protagonist's core essence, taken too far, becomes their false belief system");
            }
            if (values.coreEssence && !values.inside) {
                hints.push("Consider: what insecurity might hide beneath this core trait?");
            }
            return hints;
        }
    },
    falseBelief: {
        helps: ['stakes', 'inside', 'worstCase'],
        hints: (values) => {
            const hints = [];
            if (values.falseBelief && !values.stakes) {
                hints.push("The stakes should reflect what happens if their false belief goes unchallenged");
            }
            if (values.falseBelief && !values.worstCase) {
                hints.push("The worst case scenario is often when their false belief is confirmed");
            }
            return hints;
        }
    },
    order: {
        helps: ['problem', 'statusQuo'],
        hints: (values) => {
            const hints = [];
            if (values.order && !values.problem) {
                hints.push("Stories that begin in Order/Equilibrium typically present a PROBLEM to solve");
            }
            if (values.order && !values.statusQuo) {
                hints.push("Describe the ordered pattern of life they want to maintain");
            }
            return hints;
        }
    },
    chaos: {
        helps: ['opportunity', 'statusQuo'],
        hints: (values) => {
            const hints = [];
            if (values.chaos && !values.opportunity) {
                hints.push("Stories that begin in Chaos/Imbalance typically present an OPPORTUNITY");
            }
            if (values.chaos && !values.statusQuo) {
                hints.push("Describe the chaotic pattern of life they wish was different");
            }
            return hints;
        }
    },
    want: {
        helps: ['bestCase', 'cdq', 'externalDominant'],
        hints: (values) => {
            const hints = [];
            if (values.want && !values.bestCase) {
                hints.push("The best case scenario is what happens if they get what they want");
            }
            if (values.want && !values.cdq) {
                hints.push('Your Central Dramatic Question should be: "Will they get what they want?"');
            }
            if (values.want && !values.externalDominant) {
                hints.push("What they want often becomes the dominant External Stakes");
            }
            return hints;
        }
    },
    obstacle: {
        helps: ['antagonist', 'worstCase'],
        hints: (values) => {
            const hints = [];
            if (values.obstacle && !values.antagonist) {
                hints.push("Is this obstacle personified by your antagonist?");
            }
            if (values.obstacle && !values.worstCase) {
                hints.push("The worst case is often when the obstacle wins");
            }
            return hints;
        }
    },
    inside: {
        helps: ['internalDominant', 'internalUnderdog'],
        hints: (values) => {
            const hints = [];
            if (values.inside && !values.internalDominant) {
                hints.push("Who they are on the inside informs the Internal Stakes");
            }
            return hints;
        }
    },
    present: {
        helps: ['coreEssence'],
        hints: (values) => {
            const hints = [];
            if (values.present && !values.coreEssence) {
                hints.push("How they present to the world often reflects their core essence");
            }
            return hints;
        }
    },
    skill: {
        helps: ['bestCase', 'act3Worst'],
        hints: (values) => {
            const hints = [];
            if (values.skill && !values.bestCase) {
                hints.push("Their tangible skill will likely be crucial in achieving the best case scenario");
            }
            if (values.skill && !values.act3Worst) {
                hints.push("Act 3 often forces them to use their skill in the worst possible circumstances");
            }
            return hints;
        }
    },
    cdq: {
        helps: ['bestCase', 'worstCase'],
        hints: (values) => {
            const hints = [];
            if (values.cdq && (!values.bestCase || !values.worstCase)) {
                hints.push("The answer 'Yes' to your dramatic question = Best Case. 'No' = Worst Case");
            }
            return hints;
        }
    }
};

// Update sidebar with condensed answers
function updateSidebar() {
    const answers = [];

    Object.keys(fields).forEach(key => {
        const field = fields[key];
        if (!field || !fieldLabels[key]) return;

        let value = '';
        if (field.type === 'checkbox') {
            if (field.checked) {
                // Show the actual label text for checkboxes
                if (key === 'order') value = 'Order/Equilibrium';
                else if (key === 'chaos') value = 'Chaos/Imbalance';
                else if (key === 'opportunity') value = 'Opportunity';
                else if (key === 'problem') value = 'Problem';
                else value = '✓';
            }
        } else if (field.type === 'range') {
            value = `${field.value}/10`;
        } else if (field.tagName === 'SELECT') {
            if (field.value) {
                value = field.options[field.selectedIndex].text;
            }
        } else {
            value = field.value.trim();
        }

        if (value) {
            answers.push({
                label: fieldLabels[key],
                value: value.length > 100 ? value.substring(0, 100) + '...' : value
            });
        }
    });

    if (answers.length === 0) {
        sidebarContent.innerHTML = '<p class="sidebar-placeholder">Fill in answers to see them here...</p>';
    } else {
        sidebarContent.innerHTML = answers.map(answer => `
            <div class="sidebar-item">
                <span class="sidebar-label">${answer.label}</span>
                <div class="sidebar-value">${answer.value}</div>
            </div>
        `).join('');
    }
}

// Function to show hints for empty related fields
function showHints() {
    const values = {};

    // Gather all current values
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        if (!field) return;

        if (field.type === 'checkbox') {
            values[key] = field.checked;
        } else {
            values[key] = field.value && field.value.trim().length > 0;
        }
    });

    // Generate hints for each field that has connections
    Object.keys(fieldConnections).forEach(fieldKey => {
        const connection = fieldConnections[fieldKey];
        const hints = connection.hints(values);

        // Only show hints if this field has content
        if (values[fieldKey] && hints.length > 0) {
            displayHints(fieldKey, hints);
        } else {
            hideHints(fieldKey);
        }
    });
}

function displayHints(fieldKey, hints) {
    const field = fields[fieldKey];
    if (!field) return;

    // Find or create a single hints box in the body (not inline)
    let hintsBox = document.getElementById('hints-box-global');
    if (!hintsBox) {
        hintsBox = document.createElement('div');
        hintsBox.id = 'hints-box-global';
        hintsBox.className = 'hints-box';
        document.body.appendChild(hintsBox);
    }

    if (hints.length > 0) {
        hintsBox.innerHTML = `
            <h4>💡 Connections</h4>
            <ul>
                ${hints.map(hint => `<li>${hint}</li>`).join('')}
            </ul>
        `;
        hintsBox.classList.add('active');
    } else {
        hintsBox.classList.remove('active');
    }
}

function hideHints(fieldKey) {
    // Hide the global hints box when no fields have hints
    const hintsBox = document.getElementById('hints-box-global');
    if (hintsBox) {
        hintsBox.classList.remove('active');
    }
}

// Load saved data on page load
window.addEventListener('load', () => {
    Object.keys(fields).forEach(key => {
        const savedValue = localStorage.getItem(key);
        if (savedValue && fields[key]) {
            if (fields[key].type === 'checkbox') {
                fields[key].checked = savedValue === 'true';
            } else {
                fields[key].value = savedValue;
            }
        }
    });

    // Load saved enneagram selection
    const savedEnneagram = localStorage.getItem('enneagram');
    if (savedEnneagram) {
        let selectedLabel = '';
        enneagramPoints.forEach(point => {
            const number = point.getAttribute('data-number');
            if (number === savedEnneagram) {
                selectedLabel = point.getAttribute('data-label');
                point.querySelector('circle').setAttribute('fill', '#00d4ff');
                point.querySelector('circle').setAttribute('stroke', '#00d4ff');
            }
        });
        updateEnneagramCenter(savedEnneagram, selectedLabel);
    }

    // Show hints after loading
    setTimeout(showHints, 500);

    // Update sidebar after loading
    setTimeout(updateSidebar, 500);
});

// Auto-save as user types (debounced)
let autoSaveTimeout;

function autoSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        Object.keys(fields).forEach(key => {
            if (fields[key]) {
                if (fields[key].type === 'checkbox') {
                    localStorage.setItem(key, fields[key].checked);
                } else {
                    localStorage.setItem(key, fields[key].value);
                }
            }
        });

        // Update hints when content changes
        showHints();

        // Update sidebar
        updateSidebar();
    }, 1000);
}

// Add event listeners to all fields
Object.values(fields).forEach(field => {
    if (field) {
        field.addEventListener('input', autoSave);
        field.addEventListener('change', autoSave);
    }
});

// Manual save with feedback
saveBtn.addEventListener('click', () => {
    Object.keys(fields).forEach(key => {
        if (fields[key]) {
            if (fields[key].type === 'checkbox') {
                localStorage.setItem(key, fields[key].checked);
            } else {
                localStorage.setItem(key, fields[key].value);
            }
        }
    });

    // Visual feedback
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saved!';
    saveBtn.style.backgroundColor = '#4CAF50';

    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.backgroundColor = '#FF5722';
    }, 2000);
});

// Clear all data
clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all your work? This cannot be undone.')) {
        Object.keys(fields).forEach(key => {
            if (fields[key]) {
                if (fields[key].type === 'checkbox') {
                    fields[key].checked = false;
                } else {
                    fields[key].value = '';
                }
                localStorage.removeItem(key);
            }
        });

        // Clear all hints
        document.querySelectorAll('.hints-box').forEach(box => {
            box.classList.remove('active');
        });

        // Update sidebar
        updateSidebar();

        // Visual feedback
        const originalText = clearBtn.textContent;
        clearBtn.textContent = 'Cleared!';

        setTimeout(() => {
            clearBtn.textContent = originalText;
        }, 2000);
    }
});

// PDF Download functionality
downloadBtn.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);

    // Helper function to add text with word wrap
    function addText(text, fontSize = 11, isBold = false) {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');

        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach(line => {
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
            doc.text(line, margin, yPosition);
            yPosition += fontSize * 0.5;
        });
        yPosition += 5;
    }

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('PROTAGONIST DEVELOPMENT', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Add a line separator
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Protagonist Name & Age
    if (fields.protagonistName && fields.protagonistName.value) {
        addText('PROTAGONIST: ' + fields.protagonistName.value, 14, true);
        yPosition += 5;
    }

    // Core Essence
    addText('CORE ESSENCE', 16, true);
    if (fields.coreEssence.value) {
        addText(fields.coreEssence.value);
    }
    yPosition += 5;

    // False Belief System
    addText('FALSE BELIEF SYSTEM', 16, true);
    if (fields.falseBelief.value) {
        addText(fields.falseBelief.value);
    }
    yPosition += 5;

    // Skill
    addText('TANGIBLE SKILL', 16, true);
    if (fields.skill.value) {
        addText(fields.skill.value);
    }
    yPosition += 5;

    // Main Relationships
    addText('MAIN RELATIONSHIPS', 16, true);
    if (fields.relationships.value) {
        addText(fields.relationships.value);
    }
    yPosition += 5;

    // Antagonist
    addText('ANTAGONIST', 16, true);
    if (fields.antagonist.value) {
        addText(fields.antagonist.value);
    }
    yPosition += 5;

    // High School Superlative
    addText('IN HIGH SCHOOL, VOTED MOST LIKELY TO...', 16, true);
    if (fields.superlative.value) {
        addText(fields.superlative.value);
    }
    yPosition += 5;

    // Inner Conflict
    addText('INNER CONFLICT', 16, true);
    addText('Who do they present to be?', 12, true);
    if (fields.present.value) {
        addText(fields.present.value);
    }
    addText('Who are they on the inside?', 12, true);
    if (fields.inside.value) {
        addText(fields.inside.value);
    }
    yPosition += 5;

    // Personality Scale
    addText('PERSONALITY SCALE', 16, true);
    const scaleValue = fields.personalityScale.value;
    addText(`Introvert ${scaleValue}/10 Extrovert`);
    yPosition += 5;

    // Enneagram
    addText('ENNEAGRAM TYPE', 16, true);
    if (fields.enneagram.value) {
        const enneagramTypes = {
            '1': 'Type 1 - The Reformer',
            '2': 'Type 2 - The Helper',
            '3': 'Type 3 - The Achiever',
            '4': 'Type 4 - The Individualist',
            '5': 'Type 5 - The Investigator',
            '6': 'Type 6 - The Loyalist',
            '7': 'Type 7 - The Enthusiast',
            '8': 'Type 8 - The Challenger',
            '9': 'Type 9 - The Peacemaker'
        };
        addText(enneagramTypes[fields.enneagram.value] || fields.enneagram.value);
    }
    yPosition += 5;

    // Beginning State
    addText('THEY BEGIN THE FILM IN A STATE OF...', 16, true);
    if (fields.order.checked) {
        addText('☑ Order/Equilibrium - A Status Quo they would like to maintain');
    }
    if (fields.chaos.checked) {
        addText('☑ Chaos/Imbalance - A Status Quo they wish was different');
    }
    yPosition += 5;

    // Status Quo
    addText('STATUS QUO', 16, true);
    if (fields.statusQuo.value) {
        addText(fields.statusQuo.value);
    }
    yPosition += 5;

    // Catalyst
    addText('THE CATALYST', 16, true);
    if (fields.catalyst.value) {
        addText(fields.catalyst.value);
    }
    if (fields.opportunity.checked) {
        addText('☑ Opportunity (most commonly paired with Chaos/Imbalance)');
    }
    if (fields.problem.checked) {
        addText('☑ Problem (most commonly paired with Order/Equilibrium)');
    }
    yPosition += 5;

    // End of Act One
    addText('AT THE END OF ACT ONE...', 16, true);

    addText('What do they want?', 12, true);
    if (fields.want.value) {
        addText(fields.want.value);
    }

    addText('What stands in their way?', 12, true);
    if (fields.obstacle.value) {
        addText(fields.obstacle.value);
    }

    addText('What happens if they don\'t get it?', 12, true);
    if (fields.stakes.value) {
        addText(fields.stakes.value);
    }
    yPosition += 5;

    // Central Dramatic Question
    addText('CENTRAL DRAMATIC QUESTION', 16, true);
    if (fields.cdq.value) {
        addText(fields.cdq.value);
    }
    yPosition += 5;

    // Best and Worst Case Scenarios
    addText('BEST CASE SCENARIO', 16, true);
    if (fields.bestCase && fields.bestCase.value) {
        addText(fields.bestCase.value);
    }
    yPosition += 5;

    addText('WORST CASE SCENARIO', 16, true);
    if (fields.worstCase && fields.worstCase.value) {
        addText(fields.worstCase.value);
    }
    yPosition += 5;

    // Organizing Principle
    addText('ORGANIZING PRINCIPLE', 16, true);
    if (fields.act1Home && fields.act1Home.value) {
        addText('Act 1 - "Home": ' + fields.act1Home.value);
    }
    if (fields.act2Road && fields.act2Road.value) {
        addText('Act 2 - "The Road": ' + fields.act2Road.value);
    }
    if (fields.act3Worst && fields.act3Worst.value) {
        addText('Act 3 - "Worst Place in the World": ' + fields.act3Worst.value);
    }
    yPosition += 5;

    // Three Levels of Stakes
    addText('THREE LEVELS OF STAKES', 16, true);

    addText('External Stakes:', 12, true);
    if (fields.externalDominant && fields.externalDominant.value) {
        addText('Dominant: ' + fields.externalDominant.value);
    }
    if (fields.externalUnderdog && fields.externalUnderdog.value) {
        addText('Underdog: ' + fields.externalUnderdog.value);
    }

    addText('Internal Stakes:', 12, true);
    if (fields.internalDominant && fields.internalDominant.value) {
        addText('Dominant: ' + fields.internalDominant.value);
    }
    if (fields.internalUnderdog && fields.internalUnderdog.value) {
        addText('Underdog: ' + fields.internalUnderdog.value);
    }

    addText('Philosophical Stakes:', 12, true);
    if (fields.philosophicalDominant && fields.philosophicalDominant.value) {
        addText('Dominant: ' + fields.philosophicalDominant.value);
    }
    if (fields.philosophicalUnderdog && fields.philosophicalUnderdog.value) {
        addText('Underdog: ' + fields.philosophicalUnderdog.value);
    }

    // Save the PDF
    doc.save('protagonist-development.pdf');

    // Visual feedback
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = 'Downloaded!';

    setTimeout(() => {
        downloadBtn.textContent = originalText;
    }, 2000);
});

// Add subtle animation on focus
const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    textarea.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateX(5px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });

    textarea.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateX(0)';
    });
});

// Enneagram descriptions
const enneagramDescriptions = {
    '1': {
        title: 'Type 1 - The Reformer',
        description: 'Principled, purposeful, self-controlled, and perfectionistic. Ones are conscientious with a strong sense of right and wrong. They strive to improve things and fear being corrupt or defective.'
    },
    '2': {
        title: 'Type 2 - The Helper',
        description: 'Generous, demonstrative, people-pleasing, and possessive. Twos are empathetic and sincere, but can be sentimental and flattering. They want to be loved and appreciated and fear being unwanted.'
    },
    '3': {
        title: 'Type 3 - The Achiever',
        description: 'Adaptable, excelling, driven, and image-conscious. Threes are self-assured and attractive, but can be overly concerned with their image. They want to be valuable and worthwhile and fear being worthless.'
    },
    '4': {
        title: 'Type 4 - The Individualist',
        description: 'Expressive, dramatic, self-absorbed, and temperamental. Fours are self-aware and sensitive, but can be moody and self-conscious. They want to be themselves and fear having no identity or significance.'
    },
    '5': {
        title: 'Type 5 - The Investigator',
        description: 'Perceptive, innovative, secretive, and isolated. Fives are alert and insightful, but can be detached and overly intense. They want to be capable and competent and fear being useless or incompetent.'
    },
    '6': {
        title: 'Type 6 - The Loyalist',
        description: 'Engaging, responsible, anxious, and suspicious. Sixes are reliable and hard-working, but can be defensive and overly cautious. They want security and support and fear being without guidance.'
    },
    '7': {
        title: 'Type 7 - The Enthusiast',
        description: 'Spontaneous, versatile, acquisitive, and scattered. Sevens are playful and optimistic, but can be undisciplined and impulsive. They want to be satisfied and content and fear being deprived or trapped in pain.'
    },
    '8': {
        title: 'Type 8 - The Challenger',
        description: 'Self-confident, decisive, willful, and confrontational. Eights are protective and resourceful, but can be domineering. They want to be self-reliant and strong and fear being controlled or vulnerable.'
    },
    '9': {
        title: 'Type 9 - The Peacemaker',
        description: 'Receptive, reassuring, complacent, and resigned. Nines are accepting and trusting, but can be too willing to go along. They want inner stability and peace and fear loss and separation.'
    }
};

// Update center of enneagram diagram
function updateEnneagramCenter(number, label) {
    const centerNumber = document.querySelector('.center-number');
    const centerLabel = document.querySelector('.center-label');
    const descriptionDiv = document.getElementById('enneagram-description');

    if (number) {
        centerNumber.textContent = number;
        centerLabel.textContent = label;

        const desc = enneagramDescriptions[number];
        if (desc) {
            descriptionDiv.innerHTML = `
                <h4>${desc.title}</h4>
                <p>${desc.description}</p>
            `;
            descriptionDiv.classList.add('active');
        }
    } else {
        centerNumber.textContent = '';
        centerLabel.textContent = '';
        descriptionDiv.classList.remove('active');
    }
}

// Enneagram point click functionality
const enneagramPoints = document.querySelectorAll('.enneagram-point');
enneagramPoints.forEach(point => {
    point.addEventListener('click', function() {
        const number = this.getAttribute('data-number');
        const label = this.getAttribute('data-label');
        fields.enneagram.value = number;
        autoSave();

        // Update center display
        updateEnneagramCenter(number, label);

        // Visual feedback
        enneagramPoints.forEach(p => {
            p.querySelector('circle').setAttribute('fill', 'rgba(255, 255, 255, 0.9)');
            p.querySelector('circle').setAttribute('stroke', 'rgba(0, 212, 255, 0.3)');
        });
        this.querySelector('circle').setAttribute('fill', '#00d4ff');
        this.querySelector('circle').setAttribute('stroke', '#00d4ff');
    });
});

// Update enneagram visual when dropdown changes
fields.enneagram.addEventListener('change', function() {
    const selectedNumber = this.value;
    let selectedLabel = '';

    enneagramPoints.forEach(point => {
        const number = point.getAttribute('data-number');
        if (number === selectedNumber) {
            selectedLabel = point.getAttribute('data-label');
            point.querySelector('circle').setAttribute('fill', '#00d4ff');
            point.querySelector('circle').setAttribute('stroke', '#00d4ff');
        } else {
            point.querySelector('circle').setAttribute('fill', 'rgba(255, 255, 255, 0.9)');
            point.querySelector('circle').setAttribute('stroke', 'rgba(0, 212, 255, 0.3)');
        }
    });

    // Update center display
    updateEnneagramCenter(selectedNumber, selectedLabel);
});

// Ensure only one state checkbox is selected
fields.order.addEventListener('change', function() {
    if (this.checked) {
        fields.chaos.checked = false;
    }
    autoSave();
});

fields.chaos.addEventListener('change', function() {
    if (this.checked) {
        fields.order.checked = false;
    }
    autoSave();
});

// Ensure only one catalyst type is selected
fields.opportunity.addEventListener('change', function() {
    if (this.checked) {
        fields.problem.checked = false;
    }
    autoSave();
});

fields.problem.addEventListener('change', function() {
    if (this.checked) {
        fields.opportunity.checked = false;
    }
    autoSave();
});
