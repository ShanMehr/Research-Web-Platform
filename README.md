Research Web Platform

Research Acceleration Nexus is a full-stack web platform that helps research teams find papers, read/annotate them, and experiment with implementations in a single workflow. Built and shipped with a small team, it reached 60 users and focused on preserving “research context” across searches, notes, and experiments so literature review doesn’t reset every time you switch tools. This project is a subset of this that I worked on for my Senior Project in Spring 2025 to be able to be accessed by the public.

What it does
  - Paper discovery + relevance workflows to quickly map an area and collect key sources.​

  - In-browser PDF reading with highlighting and comments, designed to stay responsive even on very large (10,000+ page) documents.​

  - Experimentation support: upload paper implementations and reuse them inside the platform (and in external code) via a Python library and cloud storage integration.​

# Technical highlights

    - Full-stack: FastAPI backend, React frontend, Azure-hosted PostgreSQL.​

    - ML: fine-tuned a BERT-based embedding model on a curated dataset (~500 “research intent → papers” examples) for improved relevance and retrieval.​

# Stack

- Python, FastAPI, React, PostgreSQL, TensorFlow, Ray, LangGraph, JavaScript.
