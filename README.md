# Genoproteomics

**From genotype to proteotype, not stopping at RNA.**

---

## What is Genoproteomics?

Genoproteomics is the systematic study of how genetic and regulatory variation shapes the proteome—its composition, structure, modifications, interactions, and dynamics. While genomics and transcriptomics have revolutionized our understanding of genetic variation, they often stop at RNA, missing the post-transcriptional, translational, and post-translational processes that ultimately determine cellular function.

This repository hosts the **Genoproteomics Initiative website** at [genoproteomics.github.io](https://genoproteomics.github.io), which serves as:

- A **conceptual framework** defining the field and its core principles
- A **research hub** organizing key sub-areas and open questions
- A **community directory** linking labs, tools, datasets, and publications
- A **resource center** for computational pipelines and educational materials

---

## Site Structure

```
genoproteomics.github.io/
├── index.html          # Main single-page site with all sections
├── css/
│   └── style.css       # Complete stylesheet
├── assets/             # Images, logos, PDFs (add as needed)
│   └── ...
└── README.md           # This file
```

The site is built with **plain HTML, CSS, and minimal vanilla JavaScript**—no frameworks, no build step, no Jekyll. This keeps the site fast, accessible, and easy to maintain.

---

## Getting Started

### View the Live Site

Visit [https://genoproteomics.github.io](https://genoproteomics.github.io)

### Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/genoproteomics/genoproteomics.github.io.git
   cd genoproteomics.github.io
   ```

2. **Start a local server:**

   Using Python 3:
   ```bash
   python -m http.server 8000
   ```

   Using Python 2:
   ```bash
   python -m SimpleHTTPServer 8000
   ```

   Using Node.js (if you have `npx`):
   ```bash
   npx serve .
   ```

3. **Open in your browser:**

   Navigate to [http://localhost:8000](http://localhost:8000)

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Reporting Issues

Found a typo, broken link, or inaccurate information? [Open an issue](https://github.com/genoproteomics/genoproteomics.github.io/issues) describing the problem.

### Adding Labs or People

To add your lab to the People & Labs directory:

1. Fork this repository
2. Edit `index.html` and add a new `.lab-card` block in the `#people-labs` section
3. Submit a pull request with your lab's name, institution, focus area, and website link

### Adding Resources

To add tools, papers, or datasets:

1. Fork this repository
2. Edit the relevant subsection in `index.html` (Code & Pipelines, Key Papers, or Datasets)
3. Submit a pull request with a brief description and link

### Content Contributions

For larger contributions (new sections, significant edits, design changes):

1. Open an issue first to discuss the proposed change
2. Fork the repository and create a feature branch
3. Make your changes with clear, descriptive commits
4. Submit a pull request referencing the issue

### Style Guidelines

- Keep HTML semantic and accessible
- Follow the existing CSS naming conventions
- Test responsiveness on mobile before submitting
- Use placeholder text that's specific enough to be useful

---

## Roadmap

- [ ] Add logo and visual identity assets
- [ ] Create downloadable "Field Manifesto" PDF
- [ ] Add interactive research area visualization
- [ ] Build community submission form
- [ ] Add news/updates blog section
- [ ] Create educational tutorials section

---

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)  
Code: [MIT License](LICENSE)

---

## Contact

- **General inquiries:** [contact@genoproteomics.org](mailto:contact@genoproteomics.org)
- **GitHub issues:** [github.com/genoproteomics/genoproteomics.github.io/issues](https://github.com/genoproteomics/genoproteomics.github.io/issues)

---

*Built and maintained by the Genoproteomics Initiative. Founded by Kushal Raj Roy.*
