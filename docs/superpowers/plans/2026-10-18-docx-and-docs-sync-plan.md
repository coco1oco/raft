# Word (.docx) Export & Repository Documentation Synchronization Implementation Plan

> **For agentic workers:** REQUIRED SUB-AGENT: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the finalized `Attachment 4 - Thesis Outline Format.md` into the official CvSU CEIT Word template (`Attachment 4 - Thesis Outline Format (2).docx` and `Attachment 4 - Thesis Outline Format.docx`) while preserving all institutional section breaks, headers, footers, margins, and Arial 11pt typography, and synchronize the repository documentation files (`docs/ALGORITHM.md`, `docs/DATA_SOURCES.md`, `HANDOFF.md`, and `scripts/phase2_toy_problem.py`) with the finalized methodology.

**Architecture:**
1. Build a reusable, deterministic Python script `scripts/export_thesis_docx.py` using `python-docx` that loads `Attachment 4 - Thesis Outline Format (2).docx` as the base template (preserving the cover page `P000–P052`, section breaks at `P052`, `P060`, and `P153`, headers/footers, and inner title table `Table 1`), updates the Table of Contents (`Table 0`), parses `Attachment 4 - Thesis Outline Format.md` into formatted Word paragraphs/runs (converting LaTeX math `$...$` and `$$...$$`, subscripts, superscripts, bold `**...**`, italics `*...*`, and Markdown links into clean Arial 11pt Word runs with zero raw LaTeX syntax), and writes both `Attachment 4 - Thesis Outline Format.docx` and `Attachment 4 - Thesis Outline Format (2).docx`.
2. Update `docs/ALGORITHM.md`, `docs/DATA_SOURCES.md`, `HANDOFF.md`, and `scripts/phase2_toy_problem.py` (replacing the out-of-scope Tanza barangay label `"Barangay Julugan"` with `"Barangay Tejeros Convention"` in Rosario) so the codebase documentation matches the finalized thesis outline.

**Tech Stack:** Python 3.13, `python-docx` (`1.2.0`), `pytest`

---

### Task 1: Create the Markdown-to-CvSU-Docx Builder (`scripts/export_thesis_docx.py`) and Generate the `.docx` Files

**Files:**
- Create: `c:\Users\GUEST-PC\raft\scripts\export_thesis_docx.py`
- Output: `c:\Users\GUEST-PC\raft\Attachment 4 - Thesis Outline Format.docx`
- Output: `c:\Users\GUEST-PC\raft\Attachment 4 - Thesis Outline Format (2).docx`

- [ ] **Step 1: Write `c:\Users\GUEST-PC\raft\scripts\export_thesis_docx.py`**

Create `c:\Users\GUEST-PC\raft\scripts\export_thesis_docx.py` with the following complete Python implementation:

```python
"""
Export 'Attachment 4 - Thesis Outline Format.md' into the official CvSU CEIT
Word template ('Attachment 4 - Thesis Outline Format (2).docx' and
'Attachment 4 - Thesis Outline Format.docx'), preserving cover pages, headers,
footers, section breaks (P052, P060, P153), and Arial 11pt formatting.
"""

import re
import shutil
from pathlib import Path
import docx
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn


ROOT = Path(__file__).resolve().parent.parent
MD_PATH = ROOT / "Attachment 4 - Thesis Outline Format.md"
TEMPLATE_DOCX = ROOT / "Attachment 4 - Thesis Outline Format (2).docx"
BACKUP_DOCX = ROOT / "cache" / "Attachment_4_template_backup.docx"
OUT_DOCX_MAIN = ROOT / "Attachment 4 - Thesis Outline Format.docx"
OUT_DOCX_COPY = ROOT / "Attachment 4 - Thesis Outline Format (2).docx"


LATEX_REPLACEMENTS = [
    (r"\\dfrac\{([^}]+)\}\{([^}]+)\}", r"(\1) / (\2)"),
    (r"\\frac\{([^}]+)\}\{([^}]+)\}", r"(\1) / (\2)"),
    (r"\\text\{([^}]+)\}", r"\1"),
    (r"\\mathcal\{A\}", "A"),
    (r"\\tilde\{f\}_1", "f̃₁"),
    (r"\\tilde\{f\}_2", "f̃₂"),
    (r"\\pi_\{i,1\}", "π_{i,1}"),
    (r"\\pi_\{i,2\}", "π_{i,2}"),
    (r"\\pi_\{i,n\}", "π_{i,n}"),
    (r"\\pi_\{k\+1\}", "π_{k+1}"),
    (r"\\pi_\{j\+1\}", "π_{j+1}"),
    (r"\\pi_1", "π₁"),
    (r"\\pi_2", "π₂"),
    (r"\\pi_n", "π_n"),
    (r"\\pi_k", "π_k"),
    (r"\\pi_j", "π_j"),
    (r"\\pi_i", "π_i"),
    (r"\\pi\(k\)", "π(k)"),
    (r"\\pi", "π"),
    (r"\\tau_e", "τ_e"),
    (r"\\Omega", "Ω"),
    (r"\\omega", "ω"),
    (r"\\alpha", "α"),
    (r"\\infty", "∞"),
    (r"\\sum_\{([^}]+)\}\^\{([^}]+)\}", r"∑_(\1)^(\2)"),
    (r"\\sum", "∑"),
    (r"\\arg\\min_\{([^}]+)\}", r"argmin_(\1)"),
    (r"\\arg\\max_\{([^}]+)\}", r"argmax_(\1)"),
    (r"\\min", "min"),
    (r"\\max", "max"),
    (r"\\le", "≤"),
    (r"\\ge", "≥"),
    (r"\\prec", "≺"),
    (r"\\subset", "⊂"),
    (r"\\in", "∈"),
    (r"\\notin", "∉"),
    (r"\\cup", "∪"),
    (r"\\setminus", "∖"),
    (r"\\land", "∧"),
    (r"\\times", "×"),
    (r"\\cdot", "·"),
    (r"\\ominus", "⊖"),
    (r"\\oplus", "⊕"),
    (r"\\otimes", "⊗"),
    (r"\\rightarrow", "→"),
    (r"\\dots", "…"),
    (r"\\sim", "~"),
    (r"\\approx", "≈"),
    (r"\\left\(", "("),
    (r"\\right\)", ")"),
    (r"\\left\[", "["),
    (r"\\right\]", "]"),
    (r"\\left\\\{", "{"),
    (r"\\right\\\}", "}"),
    (r"\\\{", "{"),
    (r"\\\}", "}"),
    (r"\\qquad", "    "),
    (r"\\quad", "  "),
    (r"\\;", " "),
    (r"\\,", " "),
    (r"\\ ", " "),
]


def clean_math_expr(expr: str) -> str:
    """Convert a LaTeX math expression into clean human-readable mathematical notation."""
    s = expr.strip()
    # Handle cases block
    if r"\begin{cases}" in s:
        inner = s.split(r"\begin{cases}", 1)[1].split(r"\end{cases}", 1)[0]
        rows = [r.strip() for r in inner.split(r"\\") if r.strip()]
        formatted_rows = []
        for r in rows:
            parts = [p.strip() for p in r.split("&")]
            formatted_rows.append(" ".join(parts))
        prefix = s.split(r"\begin{cases}", 1)[0].strip()
        s = f"{prefix} {';  '.join(formatted_rows)}"
    for pattern, repl in LATEX_REPLACEMENTS:
        s = re.sub(pattern, repl, s)
    # Convert braced subscripts/superscripts like _{max} or ^{min}
    s = re.sub(r"\{([A-Za-z0-9]+)\}_\{([^}]+)\}", r"\1_{\2}", s)
    s = re.sub(r"_\{([^}]+)\}", r"_\1", s)
    s = re.sub(r"\^\{([^}]+)\}", r"^\1", s)
    s = s.replace("{", "").replace("}", "")
    return s.strip()


def preprocess_markdown_line(line: str) -> str:
    """Strip markdown link URLs and convert inline/display math into clean text."""
    # Convert markdown links [text](url) -> text
    s = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r"\1", line)
    # Replace display math $$...$$
    s = re.sub(r"\$\$(.+?)\$\$", lambda m: clean_math_expr(m.group(1)), s)
    # Replace inline math $...$
    s = re.sub(r"\$([^$]+)\$", lambda m: clean_math_expr(m.group(1)), s)
    # Replace backticks `code` -> code
    s = re.sub(r"`([^`]+)`", r"\1", s)
    # Replace -- with en-dash
    s = s.replace("--", "–")
    return s


def add_formatted_runs(p: docx.text.paragraph.Paragraph, text: str, default_bold: bool = False) -> None:
    """
    Parse **bold**, *italic*, and _subscript / ^superscript tokens into Word runs
    with Arial 11pt font.
    """
    token_pattern = re.compile(r"(\*\*[^*]+\*\*|\*[^*]+\*)")
    segments = token_pattern.split(text)
    for seg in segments:
        if not seg:
            continue
        is_bold = default_bold
        is_italic = False
        content = seg
        if seg.startswith("**") and seg.endswith("**") and len(seg) > 4:
            is_bold = True
            content = seg[2:-2]
        elif seg.startswith("*") and seg.endswith("*") and len(seg) > 2:
            is_italic = True
            content = seg[1:-1]

        # Split subscript/superscript patterns like W_max, f_1, H_01, 10^6, G_safe^A
        sub_sup_pattern = re.compile(r"([A-Za-z0-9πτΩωf̃]+)(_[A-Za-z0-9,+-]+)?(\^[A-Za-z0-9,+-]+)?")
        pos = 0
        for m in sub_sup_pattern.finditer(content):
            if m.group(2) is None and m.group(3) is None:
                continue
            if m.start() > pos:
                r_plain = p.add_run(content[pos:m.start()])
                r_plain.bold = is_bold
                r_plain.italic = is_italic
                r_plain.font.name = "Arial"
                r_plain.font.size = Pt(11)
            base_run = p.add_run(m.group(1))
            base_run.bold = is_bold
            base_run.italic = is_italic
            base_run.font.name = "Arial"
            base_run.font.size = Pt(11)
            if m.group(2):
                sub_run = p.add_run(m.group(2)[1:])
                sub_run.bold = is_bold
                sub_run.italic = is_italic
                sub_run.font.subscript = True
                sub_run.font.name = "Arial"
                sub_run.font.size = Pt(11)
            if m.group(3):
                sup_run = p.add_run(m.group(3)[1:])
                sup_run.bold = is_bold
                sup_run.italic = is_italic
                sup_run.font.superscript = True
                sup_run.font.name = "Arial"
                sup_run.font.size = Pt(11)
            pos = m.end()
        if pos < len(content):
            r_rem = p.add_run(content[pos:])
            r_rem.bold = is_bold
            r_rem.italic = is_italic
            r_rem.font.name = "Arial"
            r_rem.font.size = Pt(11)


def insert_paragraph_before(ref_p: docx.text.paragraph.Paragraph, doc: docx.Document) -> docx.text.paragraph.Paragraph:
    """Insert a new w:p element immediately before ref_p and return its Paragraph wrapper."""
    new_p = OxmlElement("w:p")
    ref_p._p.addprevious(new_p)
    return docx.text.paragraph.Paragraph(new_p, ref_p._parent)


def add_page_break_before(ref_p: docx.text.paragraph.Paragraph, doc: docx.Document) -> None:
    """Insert a page break paragraph before ref_p."""
    p = insert_paragraph_before(ref_p, doc)
    r = p.add_run()
    br = OxmlElement("w:br")
    br.set(qn("w:type"), "page")
    r._r.append(br)


def update_toc_table(table: docx.table.Table) -> None:
    """Update Table 0 (Table of Contents) to match the finalized sections."""
    toc_entries = [
        ("INTRODUCTION", "1", True, False),
        ("Statement of the Problem", "2", False, True),
        ("Objectives of the Study", "4", False, True),
        ("Hypothesis", "4", False, True),
        ("Significance of the Study", "6", False, True),
        ("Scope and Limitations", "6", False, True),
        ("Definition of Terms", "7", False, True),
        ("REVIEW OF RELATED LITERATURE", "10", True, False),
        ("Technical Background", "10", False, True),
        ("Humanitarian Logistics and Vehicle Routing Problems", "10", False, True),
        ("Multi-Objective Swarm Optimization and Constraint Handling", "11", False, True),
        ("Synthesis", "12", False, True),
        ("METHODOLOGY", "13", True, False),
        ("Research Design and System Architecture", "13", False, True),
        ("Spatial Network Extraction and Flood Hazard Intersection", "14", False, True),
        ("DMO-PSO Mathematical Formulation and Constraint Handling", "15", False, True),
        ("Experimental Setup, Evaluation Metrics, and Validation", "17", False, True),
        ("REFERENCES", "19", True, False),
        ("APPENDICES", "22", True, False),
    ]
    while len(table.rows) < len(toc_entries):
        table.add_row()
    for idx, (title, page, is_bold, indent) in enumerate(toc_entries):
        row = table.rows[idx]
        c0, c1 = row.cells[0], row.cells[1]
        c0.text = ""
        c1.text = ""
        p0 = c0.paragraphs[0]
        p1 = c1.paragraphs[0]
        p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        prefix = "           " if indent else ""
        dots = "." * max(5, 68 - len(prefix) - len(title))
        r0 = p0.add_run(f"{prefix}{title}{dots}")
        r0.bold = is_bold
        r0.font.name = "Arial"
        r0.font.size = Pt(11)
        r1 = p1.add_run(page)
        r1.bold = is_bold
        r1.font.name = "Arial"
        r1.font.size = Pt(11)


def build_docx() -> None:
    BACKUP_DOCX.parent.mkdir(parents=True, exist_ok=True)
    if not BACKUP_DOCX.exists():
        shutil.copy2(TEMPLATE_DOCX, BACKUP_DOCX)

    doc = docx.Document(str(BACKUP_DOCX))
    update_toc_table(doc.tables[0])

    # Fix inner title page P061 to match cover title ("HIGH-RISK COASTAL AREAS")
    for p in doc.paragraphs[:70]:
        if "HIGH COASTAL AREA OF CAVITE" in p.text:
            p.text = ""
            r = p.add_run("DYNAMIC ROUTING OF RELIEF GOODS IN HIGH-RISK COASTAL AREAS OF CAVITE USING DISCRETE MULTI-OBJECTIVE PARTICLE SWARM OPTIMIZATION")
            r.bold = True
            r.font.name = "Arial"
            r.font.size = Pt(11)

    # Locate anchor paragraphs in template:
    # P075 is 'INTRODUCTION', P153 is the section-break paragraph right before 'REFERENCES'
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    intro_idx = None
    sect_break_idx = None
    for i, p in enumerate(doc.paragraphs):
        if p.text.strip() == "INTRODUCTION" and intro_idx is None:
            intro_idx = i
        if i > 100 and p._p.find(".//w:sectPr", ns) is not None:
            sect_break_idx = i
            break

    assert intro_idx is not None and sect_break_idx is not None, "Template anchors not found"
    sect_break_p = doc.paragraphs[sect_break_idx]

    # Remove old body paragraphs from intro_idx up to sect_break_idx (exclusive)
    for p in list(doc.paragraphs[intro_idx:sect_break_idx]):
        p._p.getparent().remove(p._p)

    # Remove old paragraphs after sect_break_p (References and Appendices)
    after_idx = doc.paragraphs.index(sect_break_p) + 1
    for p in list(doc.paragraphs[after_idx:]):
        p._p.getparent().remove(p._p)

    # Create a sentinel paragraph at the very end forZone 2 insertions
    end_sentinel = doc.add_paragraph()

    # Parse Markdown lines starting from '**INTRODUCTION**'
    md_lines = MD_PATH.read_text(encoding="utf-8").splitlines()
    start_line = next(i for i, l in enumerate(md_lines) if l.strip().startswith("**INTRODUCTION**"))
    ref_line = next(i for i, l in enumerate(md_lines) if l.strip().startswith("**REFERENCES**"))

    body_lines = md_lines[start_line:ref_line]
    tail_lines = md_lines[ref_line:]

    major_chapters = {
        "**INTRODUCTION**",
        "**REVIEW OF RELATED LITERATURE**",
        "**METHODOLOGY**",
    }
    sub_headings = {
        "**Statement of the Problem**",
        "**Objectives of the Study**",
        "**Hypothesis**",
        "**Significance of the Study**",
        "**Scope and Limitations**",
        "**Definition of Terms**",
        "**Technical Background**",
        "**Humanitarian Logistics and Vehicle Routing Problems**",
        "**Multi-Objective Swarm Optimization and Constraint Handling**",
        "**Synthesis**",
        "**Research Design and System Architecture**",
        "**Spatial Network Extraction and Flood Hazard Intersection**",
        "**DMO-PSO Mathematical Formulation and Constraint Handling**",
        "**Experimental Setup, Evaluation Metrics, and Validation**",
    }

    current_sub = ""
    for raw_line in body_lines:
        stripped = raw_line.strip()
        if not stripped:
            continue
        # Skip template spacing numbers 1, 2, 3
        if stripped in {"1", "2", "3"}:
            p = insert_paragraph_before(sect_break_p, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.0
            r = p.add_run(stripped)
            r.font.name = "Arial"
            r.font.size = Pt(11)
            continue

        if stripped in major_chapters:
            if stripped != "**INTRODUCTION**":
                add_page_break_before(sect_break_p, doc)
            p = insert_paragraph_before(sect_break_p, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(6)
            p.paragraph_format.line_spacing = 1.5
            add_formatted_runs(p, stripped, default_bold=True)
            continue

        if stripped in sub_headings:
            current_sub = stripped.strip("*")
            p = insert_paragraph_before(sect_break_p, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            p.paragraph_format.space_before = Pt(10)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.line_spacing = 2.0
            add_formatted_runs(p, stripped, default_bold=True)
            continue

        # Display equation line $$...$$
        if stripped.startswith("$$") and stripped.endswith("$$"):
            p = insert_paragraph_before(sect_break_p, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_before = Pt(4)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.line_spacing = 1.5
            clean_eq = preprocess_markdown_line(stripped)
            add_formatted_runs(p, clean_eq, default_bold=False)
            continue

        # Bullet or numbered list item
        if stripped.startswith("* ") or re.match(r"^\d+\.\s", stripped):
            p = insert_paragraph_before(sect_break_p, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            p.paragraph_format.left_indent = Inches(0.5)
            p.paragraph_format.space_after = Pt(3)
            p.paragraph_format.line_spacing = 2.0
            prefix_bullet = "• " if stripped.startswith("* ") else ""
            item_text = stripped[2:].strip() if stripped.startswith("* ") else stripped
            clean_item = preprocess_markdown_line(prefix_bullet + item_text)
            add_formatted_runs(p, clean_item)
            continue

        # Regular body paragraph or Definition of Terms entry
        p = insert_paragraph_before(sect_break_p, doc)
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.line_spacing = 2.0
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.first_line_indent = Inches(0.5)
        clean_p = preprocess_markdown_line(stripped)
        add_formatted_runs(p, clean_p)

    # Zone 2: REFERENCES and APPENDICES (inserted before end_sentinel)
    in_references = False
    in_appendices = False
    for raw_line in tail_lines:
        stripped = raw_line.strip()
        if not stripped:
            continue
        if stripped in {"1", "2", "3"}:
            p = insert_paragraph_before(end_sentinel, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.0
            r = p.add_run(stripped)
            r.font.name = "Arial"
            r.font.size = Pt(11)
            continue
        if stripped == "**REFERENCES**":
            in_references = True
            in_appendices = False
            p = insert_paragraph_before(end_sentinel, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(6)
            p.paragraph_format.line_spacing = 1.0
            add_formatted_runs(p, stripped, default_bold=True)
            continue
        if stripped == "**APPENDICES**":
            in_references = False
            in_appendices = True
            add_page_break_before(end_sentinel, doc)
            p = insert_paragraph_before(end_sentinel, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(12)
            p.paragraph_format.line_spacing = 1.0
            add_formatted_runs(p, stripped, default_bold=True)
            continue
        if in_appendices and stripped.startswith("**Appendix "):
            add_page_break_before(end_sentinel, doc)
            p = insert_paragraph_before(end_sentinel, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(6)
            p.paragraph_format.line_spacing = 1.0
            add_formatted_runs(p, stripped, default_bold=True)
            continue
        if in_appendices:
            p = insert_paragraph_before(end_sentinel, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(12)
            p.paragraph_format.line_spacing = 1.5
            clean_app = preprocess_markdown_line(stripped)
            add_formatted_runs(p, clean_app)
            continue
        if in_references:
            p = insert_paragraph_before(end_sentinel, doc)
            p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            p.paragraph_format.left_indent = Inches(0.5)
            p.paragraph_format.first_line_indent = Inches(-0.5)
            p.paragraph_format.space_after = Pt(8)
            p.paragraph_format.line_spacing = 1.0
            clean_ref = preprocess_markdown_line(stripped)
            add_formatted_runs(p, clean_ref)

    # Remove sentinel
    end_sentinel._p.getparent().remove(end_sentinel._p)

    doc.save(str(OUT_DOCX_MAIN))
    shutil.copy2(OUT_DOCX_MAIN, OUT_DOCX_COPY)
    print(f"Successfully exported:\n  - {OUT_DOCX_MAIN}\n  - {OUT_DOCX_COPY}")


if __name__ == "__main__":
    build_docx()
```

- [ ] **Step 2: Run `scripts/export_thesis_docx.py` and verify the generated `.docx` files**

Run:
```powershell
python scripts/export_thesis_docx.py
python -c "import docx; d = docx.Document('Attachment 4 - Thesis Outline Format.docx'); full = '\n'.join(p.text for p in d.paragraphs); assert 'METHODOLOGY' in full and 'Spatial Network Extraction and Flood Hazard Intersection' in full and 'C-GNN-Distance' in full and 'U-GNN-Distance' in full and 'Kramer, M., Terheiden, K., & Wieprecht, S. (2016)' in full and '$$\\' not in full and '\\frac' not in full; print('DOCX VERIFICATION: OK | Paragraphs:', len(d.paragraphs), '| Tables:', len(d.tables), '| Sections:', len(d.sections))"
```
Expected: `DOCX VERIFICATION: OK` with 4 sections, 2 tables, and zero raw LaTeX macros.

---

### Task 2: Synchronize Repository Documentation (`docs/ALGORITHM.md`, `docs/DATA_SOURCES.md`, `HANDOFF.md`) and `scripts/phase2_toy_problem.py`

**Files:**
- Modify: `c:\Users\GUEST-PC\raft\scripts\phase2_toy_problem.py`
- Modify: `c:\Users\GUEST-PC\raft\docs\ALGORITHM.md`
- Modify: `c:\Users\GUEST-PC\raft\docs\DATA_SOURCES.md`
- Modify: `c:\Users\GUEST-PC\raft\HANDOFF.md`

- [ ] **Step 1: Update `scripts/phase2_toy_problem.py` so all 6 benchmark barangays reside strictly within the 5 scoped coastal municipalities**

In `c:\Users\GUEST-PC\raft\scripts\phase2_toy_problem.py`, replace `"Barangay Julugan"` (which is in Tanza) with `"Barangay Tejeros Convention"` (in Rosario, Cavite) so all 6 toy-problem barangays belong to Bacoor, Cavite City, Kawit, Noveleta, and Rosario.

- [ ] **Step 2: Update `docs/ALGORITHM.md` and `docs/DATA_SOURCES.md` to reflect the finalized depth mapping ($W_e \in \{0.00, 0.50, 1.00, 1.50\}\text{ m}$), two-tier vehicle classification, and `C-GNN` / `U-GNN` baselines**

Update `docs/ALGORITHM.md` and `docs/DATA_SOURCES.md` so the hazard tier depths (`Var = 1` $\rightarrow 0.50\text{ m}$ upper bound; `Var = 2` $\rightarrow 1.00\text{ m}$ tier midpoint; `Var = 3` $\rightarrow 1.50\text{ m}$), speed attenuation formula $v_e = v_0(1 - \alpha W_e / W_{\max})$, and baseline split (`C-GNN` vs. `U-GNN`) match Chapter 3 of `Attachment 4 - Thesis Outline Format.md`.

- [ ] **Step 3: Run pytest and verification checks**

Run:
```powershell
pytest tests/ -v
python scripts/phase2_toy_problem.py
```
Expected: All unit tests pass (`exit code 0`) and `phase2_toy_problem.py` outputs the verified 3-solution Pareto front.
