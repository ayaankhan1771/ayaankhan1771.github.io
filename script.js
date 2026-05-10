// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 11, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 11, 0.8)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .leadership-card, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate chart bars on load
window.addEventListener('load', () => {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => {
            bar.style.transition = 'height 0.8s ease-out';
            bar.style.height = height;
        }, 800 + (index * 100));
    });
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = '#fafafa';
            } else {
                navLink.style.color = '';
            }
        }
    });
});

// Typewriter Effect
const typewriterText = document.querySelector('.typewriter-text');
if (typewriterText) {
    const phrases = ["Product Manager", "Content Creator", "Builder", "Storyteller"];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = "";
    let isDeleting = false;

    function type() {
        currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }

        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed = 50;
        }

        if (!isDeleting && letterIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

// ===== Skills Knowledge Graph =====
(function () {
    var canvas = document.getElementById('skillsGraph');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var FOV = 500;
    var SPHERE_R = 170;
    var W = 0, H = 0;

    function resize() {
        var rect = canvas.parentElement.getBoundingClientRect();
        var dpr = window.devicePixelRatio || 1;
        W = rect.width;
        H = rect.height;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    var nodeDefs = [
        { label: 'User Research',     cat: 0 },
        { label: 'Problem Discovery', cat: 0 },
        { label: 'Feature Scoping',   cat: 0 },
        { label: 'MVP Definition',    cat: 0 },
        { label: 'A/B Testing',       cat: 0 },
        { label: 'Cohort Analysis',   cat: 0 },
        { label: 'SQL',               cat: 1 },
        { label: 'Python',            cat: 1 },
        { label: 'MixPanel',          cat: 1 },
        { label: 'CleverTap',         cat: 1 },
        { label: 'n8n',               cat: 1 },
        { label: 'Figma',             cat: 2 },
        { label: 'Adobe Premiere',    cat: 2 },
        { label: 'Adobe Photoshop',   cat: 2 },
        { label: 'Vibe Coding',       cat: 3 },
        { label: 'Claude Code',       cat: 3 },
        { label: 'Jira',              cat: 3 }
    ];

    var catColors = [
        [129, 140, 248],
        [52,  211, 153],
        [251, 191, 36],
        [244, 114, 182]
    ];

    var nodes = [];
    var N = nodeDefs.length;
    var goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (var i = 0; i < N; i++) {
        var yNorm = 1 - (i / (N - 1)) * 2;
        var rr = Math.sqrt(1 - yNorm * yNorm);
        var theta = goldenAngle * i;
        var def = nodeDefs[i];
        nodes.push({
            label: def.label,
            cat: def.cat,
            bx: Math.cos(theta) * rr * SPHERE_R,
            by: yNorm * SPHERE_R,
            bz: Math.sin(theta) * rr * SPHERE_R,
            x3: 0, y3: 0, z3: 0,
            px: 0, py: 0,
            pulseT: 0, pulsing: false
        });
    }

    var edgePairs = [
        ['User Research',     'Problem Discovery'],
        ['User Research',     'Feature Scoping'],
        ['User Research',     'Cohort Analysis'],
        ['Problem Discovery', 'MVP Definition'],
        ['Problem Discovery', 'Feature Scoping'],
        ['Feature Scoping',   'MVP Definition'],
        ['Feature Scoping',   'Figma'],
        ['Feature Scoping',   'Jira'],
        ['MVP Definition',    'A/B Testing'],
        ['MVP Definition',    'Jira'],
        ['A/B Testing',       'Cohort Analysis'],
        ['A/B Testing',       'MixPanel'],
        ['A/B Testing',       'SQL'],
        ['Cohort Analysis',   'MixPanel'],
        ['Cohort Analysis',   'CleverTap'],
        ['Cohort Analysis',   'SQL'],
        ['SQL',               'Python'],
        ['SQL',               'MixPanel'],
        ['Python',            'n8n'],
        ['Python',            'Claude Code'],
        ['MixPanel',          'CleverTap'],
        ['CleverTap',         'n8n'],
        ['Figma',             'MVP Definition'],
        ['Figma',             'Vibe Coding'],
        ['Adobe Premiere',    'Adobe Photoshop'],
        ['Vibe Coding',       'Claude Code'],
        ['Vibe Coding',       'n8n'],
        ['Jira',              'Problem Discovery']
    ];

    var labelToIdx = {};
    nodes.forEach(function (n, idx) { labelToIdx[n.label] = idx; });

    var edges = edgePairs
        .map(function (p) { return [labelToIdx[p[0]], labelToIdx[p[1]]]; })
        .filter(function (p) { return p[0] !== undefined && p[1] !== undefined; });

    var extraPairs = [
        ['User Research', 'Figma'],
        ['SQL', 'Cohort Analysis'],
        ['Python', 'MixPanel'],
        ['Claude Code', 'Jira'],
        ['Adobe Photoshop', 'Figma'],
        ['n8n', 'Jira'],
        ['Vibe Coding', 'Feature Scoping']
    ];
    var extraEdges = extraPairs
        .map(function (p) { return [labelToIdx[p[0]], labelToIdx[p[1]]]; })
        .filter(function (p) { return p[0] !== undefined && p[1] !== undefined; });

    var sparkEdge = null;
    var sparkTimer = 0;
    var SPARK_INTERVAL = 3500;
    var SPARK_DURATION = 1400;

    var rotY = 0;
    var tiltX = 0.18;
    var tiltY = 0;
    var mouseInfluenceX = 0;
    var mouseInfluenceY = 0;

    canvas.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouseInfluenceX = ((e.clientX - rect.left) / rect.width  - 0.5) * 0.4;
        mouseInfluenceY = ((e.clientY - rect.top)  / rect.height - 0.5) * 0.3;
    });
    canvas.addEventListener('mouseleave', function () {
        mouseInfluenceX = 0;
        mouseInfluenceY = 0;
    });

    var pulseTimer = 0;

    function rotY3(x, y, z, a) {
        var c = Math.cos(a), s = Math.sin(a);
        return [x * c + z * s, y, -x * s + z * c];
    }
    function rotX3(x, y, z, a) {
        var c = Math.cos(a), s = Math.sin(a);
        return [x, y * c - z * s, y * s + z * c];
    }
    function project(x3, y3, z3) {
        var scale = FOV / (FOV + z3);
        return { px: W / 2 + x3 * scale, py: H / 2 + y3 * scale };
    }

    var lastTime = performance.now();

    function animate(now) {
        var dt = Math.min(now - lastTime, 50);
        lastTime = now;

        ctx.clearRect(0, 0, W, H);

        rotY += 0.0003 * dt;
        tiltX += (0.18 + mouseInfluenceY - tiltX) * 0.03;
        tiltY += (mouseInfluenceX - tiltY) * 0.03;

        for (var ni = 0; ni < nodes.length; ni++) {
            var n = nodes[ni];
            var coords = rotY3(n.bx, n.by, n.bz, rotY);
            coords = rotX3(coords[0], coords[1], coords[2], tiltX);
            coords = rotY3(coords[0], coords[1], coords[2], tiltY);
            n.x3 = coords[0]; n.y3 = coords[1]; n.z3 = coords[2];
            var p = project(coords[0], coords[1], coords[2]);
            n.px = p.px; n.py = p.py;
        }

        // Permanent edges
        for (var ei = 0; ei < edges.length; ei++) {
            var a = nodes[edges[ei][0]], b = nodes[edges[ei][1]];
            var depthFactor = ((a.z3 + b.z3) / 2 + SPHERE_R) / (2 * SPHERE_R);
            var alpha = 0.18 * (0.3 + depthFactor * 0.7);
            ctx.strokeStyle = 'rgba(148,163,184,' + alpha + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.stroke();
        }

        // Spark animation
        sparkTimer += dt;
        if (!sparkEdge && sparkTimer >= SPARK_INTERVAL && extraEdges.length > 0) {
            var idx = Math.floor(Math.random() * extraEdges.length);
            sparkEdge = { a: extraEdges[idx][0], b: extraEdges[idx][1], progress: 0 };
            sparkTimer = 0;
        }
        if (sparkEdge) {
            sparkEdge.progress += dt / SPARK_DURATION;
            if (sparkEdge.progress >= 1) {
                sparkEdge = null;
            } else {
                var sa = nodes[sparkEdge.a], sb = nodes[sparkEdge.b];
                var t = sparkEdge.progress;
                var drawLen = Math.min(t * 3, 1);
                var fadeAlpha = t > 0.6 ? 1 - (t - 0.6) / 0.4 : 1;
                var ex = sa.px + (sb.px - sa.px) * drawLen;
                var ey = sa.py + (sb.py - sa.py) * drawLen;

                ctx.strokeStyle = 'rgba(129,140,248,' + (0.08 * fadeAlpha) + ')';
                ctx.lineWidth = 6;
                ctx.beginPath(); ctx.moveTo(sa.px, sa.py); ctx.lineTo(ex, ey); ctx.stroke();

                ctx.strokeStyle = 'rgba(129,140,248,' + (0.55 * fadeAlpha) + ')';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(sa.px, sa.py); ctx.lineTo(ex, ey); ctx.stroke();

                if (drawLen >= 1) {
                    var pt = ((t - 0.33) / 0.67) % 1;
                    var ppx = sa.px + (sb.px - sa.px) * pt;
                    var ppy = sa.py + (sb.py - sa.py) * pt;
                    var pg = ctx.createRadialGradient(ppx, ppy, 0, ppx, ppy, 8);
                    pg.addColorStop(0, 'rgba(129,140,248,' + (0.7 * fadeAlpha) + ')');
                    pg.addColorStop(1, 'rgba(129,140,248,0)');
                    ctx.fillStyle = pg;
                    ctx.beginPath(); ctx.arc(ppx, ppy, 8, 0, Math.PI * 2); ctx.fill();
                }
            }
        }

        // Random pulse trigger
        pulseTimer += dt;
        if (pulseTimer > 2000) {
            pulseTimer = 0;
            var ri = Math.floor(Math.random() * nodes.length);
            nodes[ri].pulsing = true;
            nodes[ri].pulseT = 0;
        }

        // Back-to-front depth sort
        var sorted = nodes.map(function (_, si) { return si; });
        sorted.sort(function (aa, bb) { return nodes[aa].z3 - nodes[bb].z3; });

        for (var si = 0; si < sorted.length; si++) {
            var sn = nodes[sorted[si]];
            var depthNorm = (sn.z3 + SPHERE_R) / (2 * SPHERE_R);
            var col = catColors[sn.cat];
            var rVal = col[0], gVal = col[1], bVal = col[2];
            var nodeRadius = 3 + depthNorm * 4.5;
            var alphaBase = 0.3 + depthNorm * 0.6;

            var pulseGlow = 0;
            if (sn.pulsing) {
                sn.pulseT += dt / 1000;
                if (sn.pulseT > 1.2) sn.pulsing = false;
                pulseGlow = Math.sin(sn.pulseT * Math.PI / 1.2) * 0.6;
            }
            var totalAlpha = Math.min(alphaBase + pulseGlow, 1);

            var glowR = nodeRadius * 4 + pulseGlow * 12;
            var gGrad = ctx.createRadialGradient(sn.px, sn.py, 0, sn.px, sn.py, glowR);
            gGrad.addColorStop(0, 'rgba(' + rVal + ',' + gVal + ',' + bVal + ',' + (totalAlpha * 0.22) + ')');
            gGrad.addColorStop(1, 'rgba(' + rVal + ',' + gVal + ',' + bVal + ',0)');
            ctx.fillStyle = gGrad;
            ctx.beginPath(); ctx.arc(sn.px, sn.py, glowR, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = 'rgba(' + rVal + ',' + gVal + ',' + bVal + ',' + totalAlpha + ')';
            ctx.beginPath(); ctx.arc(sn.px, sn.py, nodeRadius, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = 'rgba(255,255,255,' + (totalAlpha * 0.35) + ')';
            ctx.beginPath(); ctx.arc(sn.px, sn.py, nodeRadius * 0.4, 0, Math.PI * 2); ctx.fill();

            if (depthNorm > 0.25) {
                var labelAlpha = (depthNorm - 0.25) / 0.75;
                var fontSize = Math.round(9 + depthNorm * 3);
                ctx.font = '500 ' + fontSize + "px 'Inter', sans-serif";
                ctx.textAlign = 'center';
                ctx.fillStyle = 'rgba(' + rVal + ',' + gVal + ',' + bVal + ',' + (labelAlpha * 0.85) + ')';
                ctx.fillText(sn.label, sn.px, sn.py - nodeRadius - 6);
            }
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}());
