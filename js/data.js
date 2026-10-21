// =====================================================================
//  网站数据配置文件 —— 所有内容都在这里修改
//  ---------------------------------------------------------------------
//  怎么添加/编辑：
//    1. research / projects / services 是「数组」，每条是一段内容。
//    2. 新增一条：复制一整段 { ... }，粘贴到数组末尾，改字段即可。
//    3. 删除一条：整段删掉。
//    4. 图片放到 images/ 文件夹，cover 填 "images/xxx.jpg"（留空显示占位图）。
//  提示：desc / content 字段支持 <strong>加粗</strong> 等简单 HTML。
// =====================================================================

const SITE_DATA = {

  // ---------- 站点信息 ----------
  site: {
    title: "顾圣杰",
    sub: "Shengjie Gu · @南师大",
    tagline: "Deep Learning Researcher",
  },

  // ---------- 关于我 ----------
  profile: {
    name: "顾圣杰",
    enName: "Shengjie Gu",
    role: "本科生研究者",
    avatar: "", // 头像图，留空显示「顾」字
    eyebrow: "DEEP LEARNING · CV / NLP / TRANSFORMER",
    lede: "我是 <strong>南京师范大学</strong> 计算机科学与技术专业本科在读（2024 — 至今），研究方向覆盖 <strong>计算机视觉、自然语言处理与 Transformer 架构</strong>。关注从模型设计、训练到本地部署的完整链路。",
    bio: [
      {
        title: "关于我。",
        text: "2024 年进入南京师范大学攻读计算机科学与技术学士学位。在课程学习之外，我以 PyTorch 为主线系统深入深度学习——从经典的 CNN、RNN，到现代 Transformer 架构，逐步搭建起对模型结构、训练范式与工程部署的整体理解。我习惯把每个算法从公式到梯度手推一遍，再用代码从零复现一次，不做只会调包的「跑库工程师」。",
      },
      {
        title: "研究兴趣。",
        text: "我同时关注视觉与文本两条线：视觉方向上，我做实时语义分割，目标是在边缘设备的有限算力下仍能给出可用的密集预测；文本方向上，我动手实现序列模型，理解 token 级文字预测背后的概率建模原理；近期的兴趣进一步延伸到大模型迭代过程中的<strong>可靠性问题</strong>——微调带来的性能漂移、灾难性遗忘，以及如何用一套可量化的评估框架让每一次模型升级都有据可依。",
      },
      {
        title: "工程信念。",
        text: "研究和落地必须互相喂养：每一次实验都要可复现，每一个训练好的模型都要能被部署成一个真实可调用的 API。这也是我目前在学习模型量化、本地推理与服务封装的原因。",
      },
    ],
    meta: [
      { k: "LOCATION", v: "Nanjing, China" },
      { k: "EDUCATION", v: "Nanjing Normal University · B.Eng. 2024 — 至今" },
      { k: "FOCUS", v: "CV · NLP · Transformer · LLM Reliability" },
    ],
    education: [
      {
        time: "2024 — 至今",
        title: "南京师范大学 · 计算机科学与技术（本科）",
        desc: "系统学习数据结构、操作系统、计算机组成原理、概率论与数理统计；课余以 PyTorch 为主线跟进深度学习实战。",
      },
      {
        time: "2025 — 至今",
        title: "深度学习系统实战",
        desc: "从零实现 CNN / RNN / Transformer 组件，跟进实时语义分割与大模型微调方向，维护 GitHub 上的 Demo 集合。",
      },
    ],
    tech: [
      { name: "Python" }, { name: "PyTorch" }, { name: "NumPy" }, { name: "OpenCV" },
      { name: "Transformers", v: true }, { name: "HuggingFace", v: true }, { name: "ONNX", v: true },
      { name: "CUDA", f: true }, { name: "Git / Linux", f: true }, { name: "C++" },
    ],
    email: "2627189368@qq.com",
    phone: "13851972379",
    github: "https://github.com/CamelliaGU",
  },

  // =====================================================================
  //  研究方向 Research
  // =====================================================================
  research: [
    {
      id: "research-1",
      icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18M15 3v18"/>',
      sub: "VISION · REAL-TIME SEGMENTATION",
      title: "视觉算法 — 实时语义分割",
      desc: "面向自动驾驶、视频监控与端侧 AR 等场景，研究在有限算力下实现像素级密集预测的方法。关注轻量化主干网络、编解码器结构设计与推理加速，在保持 mIoU 不掉的前提下压低单帧延迟，让分割模型真正能在移动端和嵌入式设备上跑起来。",
      tags: ["Semantic Seg.", "Lightweight Backbone"],
      content: [
        "语义分割要求为图像中的每个像素赋予语义类别，是计算机视觉中信息密度最高、计算开销最大的任务之一。在自动驾驶、医学影像、遥感与端侧 AR 等场景里，模型既要「看得准」，也要「算得快」。",
        "我关注的方向是实时语义分割：在保持 mIoU 不掉的前提下，通过轻量化主干网络、高效编解码器结构与特征融合策略，把单帧推理延迟压到实时范围，让分割模型真正能在移动端与嵌入式设备上运行。",
        "长期目标是形成一套可复用的「精度—速度」权衡方法：针对不同算力预算，能快速给出结构裁剪、蒸馏与量化的组合方案。",
      ],
      images: [],
      links: [],
    },
    {
      id: "research-2",
      icon: '<path d="M4 6h16M4 12h10M4 18h7"/><circle cx="19" cy="17" r="3"/>',
      sub: "NLP · SEQUENCE MODELING",
      title: "文本处理 — 序列模型实现与文字预测",
      desc: "从自回归语言模型的第一性原理出发，动手实现 RNN、LSTM 与 Transformer Decoder，探索 token 级文字预测、序列补全与字符级生成任务。重点理解概率建模、上下文窗口与解码策略如何共同决定生成文本的连贯性与质量。",
      tags: ["RNN / LSTM", "Autoregressive LM"],
      content: [
        "自然语言处理的起点是序列建模：把一段文本看作 token 序列，学习条件概率分布 P(x_t | x_{<t})，从而完成文字预测、补全与生成。",
        "我从第一性原理出发，动手实现 RNN、LSTM 与 Transformer Decoder，理解梯度在长序列中的传播、注意力机制对上下文的建模，以及温度、top-k、top-p 等解码策略如何影响生成质量。",
        "通过对比不同架构在同一字符级生成任务上的表现，逐步建立对「概率建模 → 模型容量 → 生成连贯性」这一因果链的直观认识，为后续大模型研究打下基础。",
      ],
      images: [],
      links: [],
    },
    {
      id: "research-3",
      icon: '<path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/>',
      sub: "LLM · ITERATION RELIABILITY",
      title: "大模型迭代可靠性研究",
      desc: "围绕大模型微调与版本迭代过程中的稳定性问题，关注训练 / 评估分布偏移、灾难性遗忘、对抗鲁棒性与数据漂移，尝试建立可量化的可靠性评估框架，让每一次模型版本升级都能用指标说话，而不是「感觉变好了」。",
      tags: ["Fine-tuning", "Catastrophic Forgetting", "Eval"],
      content: [
        "大模型的能力来自快速迭代，但迭代本身也带来风险：微调可能导致灾难性遗忘，数据分布变化会引入评估偏移，对抗输入则暴露鲁棒性短板。",
        "我关注如何量化这些风险：设计回归测试与一致性指标，让每一次模型版本升级都有一组可对比的评估结果，而不是依赖「感觉变好了」这类主观判断。",
        "目标是搭建一套轻量的可靠性评估框架，覆盖能力对齐、输出一致性与鲁棒性三个维度，为模型的持续演进提供可追溯的证据链。",
      ],
      images: [],
      links: [],
    },
    {
      id: "research-4",
      icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
      sub: "MLOPS · DEPLOYMENT",
      title: "模型部署与推理优化",
      desc: "把训练好的视觉与语言模型导出为 ONNX / TorchScript，结合权重量化、算子融合与显存优化，在 CPU 与边缘 GPU 上完成低延迟推理，并封装成 HTTP / gRPC API，对接上层业务。",
      tags: ["ONNX", "Quantization", "API"],
      content: [
        "训练只是第一步，让模型变成可被真实业务调用的服务才是落地的关键。我关注模型从 PyTorch 到生产环境的完整链路。",
        "实践上包括：导出 ONNX / TorchScript、INT8 / FP16 权重量化、算子融合与显存优化，在 CPU 与边缘 GPU 上完成低延迟推理。",
        "最终把推理服务封装成 HTTP / gRPC API，配合清晰的接口文档与部署脚本，让视觉与语言模型能被上层应用稳定调用。",
      ],
      images: [],
      links: [],
    },
  ],

  // =====================================================================
  //  项目 Projects
  // =====================================================================
  projects: [
    {
      id: "project-1",
      title: "Deep Learning Playground",
      year: "2025 — 至今",
      desc: "基于 PyTorch 从零实现的深度学习算法 Demo 集合，覆盖经典 CNN 图像分类、RNN / LSTM 字符级文字生成，以及一个精简版 Transformer 训练 pipeline。每个实验都配有可运行的 Jupyter Notebook、训练曲线与中间结果可视化。",
      cover: "", // 如 "images/playground.jpg"
      tags: ["PyTorch", "Notebook", "From Scratch"],
      content: [
        "这是一个基于 PyTorch 从零实现的深度学习算法 Demo 集合，目标是把每个核心算法都亲手写一遍，理解其背后的数学与工程细节。",
        "目前包含：经典 CNN 图像分类、RNN / LSTM 字符级文字生成，以及一个精简版 Transformer 训练 pipeline，覆盖从数据加载、模型定义到训练循环的完整流程。",
        "每个实验都配有可运行的 Jupyter Notebook、训练曲线与中间结果可视化，方便快速复现与二次开发。项目持续更新，完整代码托管在 GitHub。",
      ],
      images: [],
      links: [
        { label: "GitHub", url: "https://github.com/CamelliaGU" },
      ],
    },
  ],

  // =====================================================================
  //  提供服务 Services
  // =====================================================================
  services: [
    {
      id: "service-1",
      icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
      title: "科研合作",
      desc: "欢迎对 <strong>实时语义分割 / 序列模型 / 大模型微调可靠性</strong> 方向感兴趣的朋友与我联系。可以一起读 paper、复现实验、共建开源项目，也欢迎围绕课程项目、竞赛课题做联合开发。",
      price: "Free · 双向匹配",
      linkLabel: "发起合作 →",
      content: [
        "欢迎对实时语义分割、序列模型与大模型微调可靠性方向感兴趣的朋友与我联系合作。",
        "合作形式灵活：可以一起读 paper、复现实验、共建开源项目，也可以围绕课程项目、竞赛课题做联合开发。",
        "如果你有明确的研究问题或想复现某篇论文却卡在工程细节上，欢迎联系我，一起把它做出来。",
      ],
      images: [],
      links: [],
    },
    {
      id: "service-2",
      icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="8" cy="10" r="1.6"/><circle cx="15" cy="9" r="1.6"/><circle cx="11.5" cy="13" r="1.6"/>',
      title: "本地部署 & API 接口服务",
      desc: "提供开源大模型与视觉模型的<strong>本地化部署</strong>服务：模型下载、环境适配、量化压缩、显存优化，并封装成 HTTP API 接口，支持 CPU / GPU 推理环境，帮你把跑通的模型变成一个能被业务系统直接调用的服务。",
      price: "按项目 · 远程",
      linkLabel: "咨询报价 →",
      content: [
        "提供开源大模型与视觉模型的本地化部署服务：模型下载、环境适配、量化压缩与显存优化。",
        "支持 CPU / GPU 推理环境，把训练好的模型导出、优化后封装成 HTTP API 接口，让业务系统可以直接调用。",
        "交付时附带接口文档与部署脚本，确保服务可复现、可维护。具体需求欢迎邮件沟通报价。",
      ],
      images: [],
      links: [],
    },
  ],
};
