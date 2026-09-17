# Kshitij Gupta

Forward Deployed Engineer & ML Researcher

> I ship production LLM systems, and publish the NLP research that sharpens how those systems are built. I also build open-source agent tooling (tracesage, vectorsmith).

- Site: https://kjgpta.github.io/
- LLM index: https://kjgpta.github.io/llms.txt
- Email: mailguptakshitij@gmail.com
- Resume: https://drive.google.com/file/d/1hyGGLxUZND9vcFseIv2o_QOY_XyQtrWS/view?usp=drive_link
- GitHub: https://github.com/kjgpta
- tracesage: https://kjgpta.github.io/tracesage/
- vectorsmith: https://kjgpta.github.io/vectorsmith/
- Substack: https://kjgpta.substack.com/
- LinkedIn: https://www.linkedin.com/in/kjgpta/
- Scholar: https://scholar.google.com/citations?user=uvSOzIkAAAAJ&hl=en

HTML focus tracks: All (default), Application (`?focus=app`), Research (`?focus=research`). Writing is All/Application only. Publications are All/Research only.

Section order on the site: Experience -> Open source (tracesage, vectorsmith) -> Publications -> Writing -> Earlier projects -> Skills -> About -> Footer

## Experience

### Forward Deployed Engineer - [TrueFoundry](https://www.truefoundry.com/) | Bengaluru
**June 2026 - Present**

- Design and deploy production AI applications on cloud-native LLM infrastructure: RAG, agentic workflows, and serving.
- Work with customers to turn technical requirements into ML solutions, prototype approaches, evaluate how a system behaves, and drive production adoption.
- Diagnose ML system issues alongside engineering and product, balancing model quality against latency, reliability, and operational constraints.

### Machine Learning Engineer - [Chubb](https://www.chubb.com/) Business Services India | Hyderabad
**July 2023 - May 2026**

- LLaMA-3.1 70B + LoRA/QLoRA + RAG over internal domain data: +25% accuracy, -15% drift, gated on holdout evaluation and progressive traffic.
- Offline evaluation workflows comparing model and retrieval configurations on accuracy, factual grounding, and regressions before release.
- Multi-agent planner / router that decomposes intents into subtasks and selects tools: internal search, scraping, structured database lookups.
- Retrieval and verification agents with source-level citation tracking: +18% factual grounding over a single-agent baseline.
- vLLM on AKS (A100/H100) with GPU memory and KV-cache tuning: -40% p95, +50% throughput, 10K+ daily requests.
- CI/CD, monitoring, and autoscaling for reproducible model releases.

### NLP Research Intern - [Speech Lab](https://aseschng.github.io/speechLab_intro.html) | [NTU Singapore](https://www.ntu.edu.sg/)
**June 2022 - June 2023**

- RNN English-Malay language model for Singaporean conversational speech: +20% over baselines.
- Statistical and neural augmentation to generate synthetic code-switched training data and test its effect on robustness and generalization.
- POS tags, switching patterns, and coherence constraints folded into training and inference to cut switching errors.
- Published and presented at IALP 2023 and ACIIDS 2023.

### B.E. Electronics & Electrical Engineering - [BITS Pilani, Pilani Campus](https://www.bits-pilani.ac.in/pilani/)
**2019 - 2023**

- Graduated at 8.0/10.0, with foundations in systems, ML coursework, and applied software projects.

## Organizations

- [TrueFoundry](https://www.truefoundry.com/)
- [Chubb](https://www.chubb.com/)
- [Speech and Language Laboratory (NTU)](https://aseschng.github.io/speechLab_intro.html)
- [Nanyang Technological University](https://www.ntu.edu.sg/)
- [BITS Pilani, Pilani Campus](https://www.bits-pilani.ac.in/pilani/)

## Open source

Two libraries, both maintained. On the HTML site they share one section, tracesage first.

### tracesage

Local-first observability for LangChain and LangGraph. MIT-licensed, beta.

**Problem.** LangGraph runs are black boxes. Hosted tracers work, but local debugging should not require a cloud account.

**Approach.** Hook LangChain's callback stream, persist to SQLite + gzipped blobs, render an interactive SVG graph + timeline over WebSocket. MCP tools are attributed to their server. Optional OpenTelemetry export bridges into Tempo / Jaeger / Datadog / Honeycomb.

**Outcome.** `pip install "tracesage[langchain]"` then `tracesage demo`, or add one callback to `ainvoke`. Featured in [Python Weekly Issue 750](https://www.pythonweekly.com/p/python-weekly-issue-750-june-18-2026) (June 18, 2026) under Interesting Projects, Tools, and Libraries.

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

### vectorsmith

A vector store exposed to agents as typed tools. Apache-2.0; backends still marked experimental.

**Problem.** Pointing an agent at your own data means either a vendor MCP server that hands the model cluster administration (upsert, delete, create-collection), or hand-bound JSON schemas that re-implement filters, limits, and tenant isolation in every agent.

**Approach.** Declare each tool in a `tools.yaml`: collection, the parameters the model may pass, and static filters it must never see. The compiler validates the file, lints for leaked secrets, and emits either in-process Python tools or an MCP server. Connections and tenant scoping stay server-side and are applied to every call.

**Outcome.** `pip install "vectorsmith[qdrant]"` then `vectorsmith serve tools.yaml`, or `load_tools` in Python.

Capabilities:

- Tool kinds: search, lookup, count, scroll, pipeline
- Model-visible parameters separated from credentials and tenant-scoped filters
- Schema validation, secret linting, configurable retrieval limits
- Hosts: Claude, Cursor, Codex over MCP stdio or HTTP; LangChain, LangGraph, OpenAI Agents, Anthropic in-process

Links:

- Docs: https://kjgpta.github.io/vectorsmith/
- GitHub: https://github.com/kjgpta/vectorsmith
- PyPI: https://pypi.org/project/vectorsmith/
- Stores: Qdrant | Chroma | Milvus | pgvector | Pinecone | Weaviate
- Stack: Python 3.11+ | MCP | Pydantic | Polars | Typer

## Publications

1. **WhoDunIt: Evaluation benchmark for culprit detection in mystery stories** - Long-form narrative reasoning benchmark for culprit detection beyond short QA. arXiv, ACL ARR | Dec 2024 | [arXiv:2502.07747](https://arxiv.org/abs/2502.07747)
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

Coursework archive on the HTML site, set as a plain two-column index before Skills / About so the page ends on About.

- [Token Bucket Algorithm](https://github.com/kjgpta/Token-Bucket-Algorithm) - Object Oriented Programming
- [Automated Essay Scoring](https://github.com/kjgpta/SHL-Automated-Essay-Scoring) - Natural Language Processing
- [Contextual Chatbot](https://github.com/kjgpta/Contextual-Chatbot-in-Pytorch) - Natural Language Processing
- [Paragraph Summarizer](https://github.com/kjgpta/Paragraph-Summarizer) - Natural Language Processing
- [MNIST Digit Classification](https://github.com/kjgpta/MNIST-Handwritten-Digit-Classification) - Computer Vision
- [Unity Games](https://github.com/kjgpta/Unity-Projects) - Game Development

## Skills

**LLM & ML:** NLP, LLMs, RAG, PEFT (LoRA / QLoRA), Fine-tuning, Prompt engineering, Evaluation

**Research:** Experimental design, Model evaluation, Error analysis, Data augmentation, Benchmarking

**Serving & infra:** vLLM, Kubernetes (AKS), Docker, KV-cache optimization, OpenTelemetry, CI/CD, Databricks

**Frameworks:** PyTorch, Hugging Face Transformers, spaCy, TensorFlow / Keras, LangChain, LangGraph

**Backend:** Python, FastAPI, Pydantic, Flask

**Cloud & data:** Azure, AWS, SQL, CosmosDB

## About

I care about systems that survive real traffic, and methods that hold up under scrutiny.

Working principles:

- **Ship** - Production over theatre. Latency, accuracy, and grounding under load.
- **Prove** - Measure what matters so teams can trust the system.
- **Publish** - When the problem needs a better evaluation or model story, write it down.

Most of the work is building and evaluating LLM systems across fine-tuning, RAG, agentic workflows, and production inference, with much of the time going on experimentation and on working out where a system fails.

Open to collaborations on LLM tooling, production AI systems, agent observability, and applied NLP.

## Contact

- Email: [mailguptakshitij@gmail.com](mailto:mailguptakshitij@gmail.com)
- Resume: [Google Drive PDF](https://drive.google.com/file/d/1hyGGLxUZND9vcFseIv2o_QOY_XyQtrWS/view?usp=drive_link)
- GitHub: https://github.com/kjgpta
- Substack: https://kjgpta.substack.com/
