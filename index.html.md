# Kshitij Gupta

Forward Deployed Engineer & ML Researcher

> I ship production LLM systems - and publish the NLP research that sharpens how those systems are built. I also build open-source agent tooling (tracesage).

- Site: https://kjgpta.github.io/
- LLM index: https://kjgpta.github.io/llms.txt
- Email: mailguptakshitij@gmail.com
- Resume: https://drive.google.com/file/d/1hyGGLxUZND9vcFseIv2o_QOY_XyQtrWS/view?usp=drive_link
- GitHub: https://github.com/kjgpta
- tracesage: https://kjgpta.github.io/tracesage/
- Substack: https://kjgpta.substack.com/
- LinkedIn: https://www.linkedin.com/in/kjgpta/
- Scholar: https://scholar.google.com/citations?user=uvSOzIkAAAAJ&hl=en

HTML focus tracks: All (default), Application (`?focus=app`), Research (`?focus=research`). Writing is All/Application only. Publications are All/Research only.

Section order on the site: Experience -> Featured work (tracesage) -> Publications -> Writing -> Earlier projects -> Skills -> About -> Footer

## Experience

### Forward Deployed Engineer - [TrueFoundry](https://www.truefoundry.com/) | Bengaluru
**June 2026 - Present**

- Partner with customers to ship production AI apps on cloud-native LLM infrastructure.
- Turn platform capabilities into adoption paths and measurable business outcomes - not slide-deck demos.

### Machine Learning Engineer - [Chubb](https://www.chubb.com/) Engineering Center India | Hyderabad
**July 2023 - May 2026**

- LLaMA-3.1 70B + LoRA/QLoRA + RAG - +25% accuracy, -15% drift.
- Multi-agent planner / retriever / verifier - +18% factual grounding.
- vLLM on AKS (A100/H100) - -40% p95, +50% throughput, 10K+ daily requests.
- Built HawkHire - explainable AI hiring copilot for internal recruiting workflows (not public).

### NLP Research Intern - [Speech Lab](https://aseschng.github.io/speechLab_intro.html) | [NTU Singapore](https://www.ntu.edu.sg/)
**June 2022 - June 2023**

- English-Malay code-switched LMs - +20% over baselines.
- Published multilingual and code-switching work across ACL-adjacent venues.

### B.E. Electrical & Electronics - [BITS Pilani, Pilani Campus](https://www.bits-pilani.ac.in/pilani/)
**2019 - 2023**

- Foundations in systems, ML coursework, and applied software projects.

## Organizations

- [TrueFoundry](https://www.truefoundry.com/)
- [Chubb](https://www.chubb.com/)
- [Speech and Language Laboratory (NTU)](https://aseschng.github.io/speechLab_intro.html)
- [Nanyang Technological University](https://www.ntu.edu.sg/)
- [BITS Pilani, Pilani Campus](https://www.bits-pilani.ac.in/pilani/)

## Featured work: tracesage

Open-source, local-first observability for LangChain and LangGraph. MIT-licensed, beta.

**Problem.** LangGraph runs are black boxes. Hosted tracers work, but local debugging should not require a cloud account.

**Approach.** Hook LangChain's callback stream, persist to SQLite + gzipped blobs, render an interactive SVG graph + timeline over WebSocket. MCP tools are attributed to their server. Optional OpenTelemetry export bridges into Tempo / Jaeger / Datadog / Honeycomb.

**Outcome.** `pip install "tracesage[langchain]"` then `tracesage demo` - or add one callback to `ainvoke`. Featured in [Python Weekly Issue 750](https://www.pythonweekly.com/p/python-weekly-issue-750-june-18-2026) (June 18, 2026) under Interesting Projects, Tools, and Libraries.

Capabilities:

- Zero infra - no Docker, Postgres, or external service
- Crash-safe handler - tracing never takes down your agent
- MCP-aware tool-source attribution + pytest fixture for CI
- OTel export when you graduate from laptop to a central stack

Links:

- Docs: https://kjgpta.github.io/tracesage/
- GitHub: https://github.com/kjgpta/tracesage
- PyPI: https://pypi.org/project/tracesage/
- Stack: Python | LangChain | LangGraph | MCP | SQLite | OpenTelemetry | WebSocket UI

## Publications

1. **WhoDunit: Evaluation benchmark for culprit detection in mystery stories** - Long-form narrative reasoning benchmark for culprit detection beyond short QA. Published on arXiv | Dec 2024 | [arXiv:2502.07747](https://arxiv.org/abs/2502.07747)
2. **MALM: Mixing Augmented Language Modeling for Zero-Shot Machine Translation** - Mixing-based augmentation for zero-shot MT without parallel data for every pair. AACL-IJCNLP 2022 (NLP4DH) | [ACL Anthology](https://aclanthology.org/2022.nlp4dh-1.8)
3. **Adapting Code-Switching Language Models with Statistical-Based Text Augmentation** - Statistical augmentation to adapt LMs for code-switched data. ACIIDS 2023 | [Springer](https://link.springer.com/chapter/10.1007/978-981-99-5837-5_26)
4. **Singaporean Conversational English-Malay Code-Switching Points** - Characterizes where English-Malay switches occur in Singaporean conversation. IALP 2023 | [IEEE](https://ieeexplore.ieee.org/document/10337279)
5. **Data Augmentation for Automated Essay Scoring using Transformer Models** - Augmentation for transformer AES with limited labeled essays. AISC 2023 | [IEEE](https://ieeexplore.ieee.org/document/10085523)

## Writing

On the HTML site, Writing appears for All / Application focus. Always listed here.

1. [You Don't Need LangSmith to Trace LangGraph](https://kjgpta.substack.com/p/you-dont-need-langsmith-to-trace) - Substack | Jun 21, 2026 - local-first tracing pitch vs hosted tracers
2. [tracesage: See Inside Your LangGraph Agents](https://kjgpta.substack.com/p/tracesage-see-inside-your-langgraph) - Substack | Jun 16, 2026 - product walkthrough (topology, MCP, pytest, production knobs)
3. [Python Weekly Issue 750](https://www.pythonweekly.com/p/python-weekly-issue-750-june-18-2026) - Jun 18, 2026 - tracesage listed under Interesting Projects, Tools, and Libraries

## Earlier projects

Coursework archive on the HTML site (expanded by default; placed before Skills / About so the page ends on About).

- [Token Bucket Algorithm](https://github.com/kjgpta/Token-Bucket-Algorithm) - Object Oriented Programming
- [Automated Essay Scoring](https://github.com/kjgpta/SHL-Automated-Essay-Scoring) - Natural Language Processing
- [Contextual Chatbot](https://github.com/kjgpta/Contextual-Chatbot-in-Pytorch) - Natural Language Processing
- [Paragraph Summarizer](https://github.com/kjgpta/Paragraph-Summarizer) - Natural Language Processing
- [MNIST Digit Classification](https://github.com/kjgpta/MNIST-Handwritten-Digit-Classification) - Computer Vision
- [Unity Games](https://github.com/kjgpta/Unity-Projects) - Game Development

## Skills

**Models & agents:** Python, PyTorch, Transformers, LoRA / QLoRA, RAG, Multi-agent, LangChain / LangGraph, Hugging Face

**Serving & infra:** vLLM, Kubernetes, AKS, Azure, AWS, Docker, OpenTelemetry, Databricks, CI/CD

**Research:** NLP, Code-switching, Eval benchmarks

## About

I care about systems that survive real traffic - and methods that hold up under scrutiny, not demos that die after the slide deck.

Working principles:

- **Ship** - Production over theatre. Latency, accuracy, and grounding under load.
- **Prove** - Measure what matters so teams can trust the system.
- **Publish** - When the problem needs a better evaluation or model story, write it down.

Open to collaborations on LLM tooling, production AI systems, agent observability, and applied NLP.

## Contact

- Email: [mailguptakshitij@gmail.com](mailto:mailguptakshitij@gmail.com)
- Resume: [Google Drive PDF](https://drive.google.com/file/d/1hyGGLxUZND9vcFseIv2o_QOY_XyQtrWS/view?usp=drive_link)
- GitHub: https://github.com/kjgpta
- Substack: https://kjgpta.substack.com/
