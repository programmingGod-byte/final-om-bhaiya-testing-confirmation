/**
 * System Verification Module
 * 
 * This module covers comprehensive hardware verification methodologies for digital design.
 */

export const systemVerification = {
  id: "system-verification",
  title: "System Verification with SystemVerilog & UVM",
  description: "Master advanced verification methodologies for complex digital designs using SystemVerilog and UVM",
  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  level: "Advanced",
  duration: "6 weeks",
  rating: 4.8,
  studentsCount: 28,
  completed: 0,
  updatedAt: "2025-05-01",
  topics: [
    "SystemVerilog",
    "UVM Methodology",
    "Constrained Random Verification",
    "Functional Coverage",
    "Assertions",
    "Formal Verification"
  ],
  lessons: 24,
  exercises: 12,
  students: 2840,
  bookmarked: false,
  instructor: {
    name: "Dr. Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    bio: "Dr. Sarah Johnson is a verification expert with 15+ years of experience at leading semiconductor companies. She has led verification teams for complex SoCs and processors, specializing in UVM and formal verification methodologies.",
    credentials: [
      "Ph.D. in Computer Engineering, Stanford University",
      "Lead Verification Engineer at AMD (2010-2018)",
      "Verification Architect at Cadence (2018-2022)",
      "Author of 'Practical SystemVerilog Verification' (2021)"
    ]
  },
  overview: "This comprehensive module teaches you hardware verification methodologies essential for today's complex digital designs. Starting with verification fundamentals, you'll learn industry-standard techniques including Universal Verification Methodology (UVM), assertion-based verification, formal methods, and coverage-driven verification. The course emphasizes practical skills that are in high demand across the semiconductor industry, where verification engineers typically outnumber design engineers 2:1. You'll develop hands-on experience with SystemVerilog, UVM, and industry-standard verification tools while building a portfolio of verification components that demonstrate your skills to potential employers.",
  
  careerGuide: {
    title: "Verification Engineering Career Path",
    description: "Verification engineering is one of the most in-demand specializations in the semiconductor industry, with verification engineers typically outnumbering designers by 2:1 at major companies.",
    jobRoles: [
      {
        title: "Verification Engineer",
        description: "Develop test environments and verify digital designs against specifications",
        averageSalary: "$120,000 - $150,000",
        requiredSkills: ["SystemVerilog", "UVM", "Testbench Development", "Coverage Analysis"],
        keyCompanies: ["Intel", "AMD", "NVIDIA", "Qualcomm", "Broadcom"]
      },
      {
        title: "Verification Architect",
        description: "Design verification strategies and methodologies for complex systems",
        averageSalary: "$150,000 - $180,000",
        requiredSkills: ["System Architecture", "Verification Planning", "UVM", "Performance Analysis"],
        keyCompanies: ["ARM", "Synopsys", "Cadence", "Siemens EDA", "MediaTek"]
      },
      {
        title: "FPGA Verification Specialist",
        description: "Verify designs targeted for FPGA implementation",
        averageSalary: "$110,000 - $140,000",
        requiredSkills: ["FPGA Prototyping", "SystemVerilog", "Vivado/Quartus", "Emulation"],
        keyCompanies: ["Xilinx", "Intel", "Microchip", "Achronix", "Microsoft"]
      },
      {
        title: "Formal Verification Engineer",
        description: "Apply mathematical methods to prove design correctness",
        averageSalary: "$130,000 - $170,000",
        requiredSkills: ["Formal Methods", "SVA", "PSL", "Model Checking"],
        keyCompanies: ["OneSpin", "Cadence", "Synopsys", "Intel", "IBM"]
      }
    ],
    industryTrends: [
      {
        trend: "Shift-Left Verification",
        description: "Moving verification earlier in the design process",
        impact: "Growing demand for engineers skilled in early specification analysis and formal methods"
      },
      {
        trend: "ML-Assisted Verification",
        description: "Using machine learning to optimize test generation and coverage",
        impact: "New opportunities at the intersection of verification and AI/ML"
      },
      {
        trend: "Portable Stimulus Standard",
        description: "Industry adoption of the Accellera Portable Test and Stimulus Standard",
        impact: "Increased need for engineers familiar with abstract verification models"
      },
      {
        trend: "Hardware Security Verification",
        description: "Growing focus on security verification in hardware designs",
        impact: "Rising demand for verification engineers with security expertise"
      }
    ],
    interviewPreparation: {
      technicalTopics: [
        "SystemVerilog language features for verification",
        "UVM components and methodology",
        "Constrained random verification techniques",
        "Functional coverage and metrics",
        "Assertions and formal properties",
        "Verification planning and management",
        "Debug methodologies",
        "Performance verification",
        "Low-power verification"
      ],
      commonQuestions: [
        "Explain the structure of a UVM testbench and the role of each component.",
        "How would you develop a verification plan for a memory controller?",
        "Describe your approach to debugging a complex issue in a random testbench.",
        "How do you ensure you have adequate coverage of a design's functionality?",
        "Compare and contrast directed testing versus constrained random verification.",
        "Explain how you would verify a complex protocol interface.",
        "How would you handle clock domain crossing verification?",
        "Describe your experience with formal verification tools and methodologies."
      ],
      technicalChallenges: [
        "Create a UVM environment for an AXI interface",
        "Develop a set of SystemVerilog assertions for a FIFO controller",
        "Implement a constraint solver for generating complex test scenarios",
        "Build a reusable scoreboard component for transaction verification",
        "Develop a coverage model for a cache coherence protocol"
      ]
    }
  },
  
  prerequisites: [
    "Basic understanding of digital logic",
    "Familiarity with hardware description languages (Verilog/VHDL)",
    "Computer architecture fundamentals",
    "Programming experience (preferably C/C++)",
    "Completion of Verilog Fundamentals module recommended"
  ],
  skills: [
    "SystemVerilog for Verification",
    "Universal Verification Methodology (UVM)",
    "Testbench Architecture",
    "Constrained Random Testing",
    "Functional Coverage",
    "Assertion-Based Verification",
    "Formal Verification",
    "Coverage-Driven Verification",
    "Protocol Verification",
    "Performance Analysis",
    "Debug Techniques",
    "Verification Planning",
    "Low Power Verification",
    "Hardware Security Verification",
    "Regression Testing"
  ],
  chapters: [
    {
      id: 1,
      title: "Verification Fundamentals",
      description: "Introduction to hardware verification concepts and methodologies",
      estimatedTime: "2 hours",
      completed: false
    },
    {
      id: 2,
      title: "SystemVerilog for Verification",
      description: "SystemVerilog language features specifically for verification",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 3,
      title: "Testbench Architecture",
      description: "Building structured and reusable verification environments",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 4,
      title: "Stimulus Generation",
      description: "Techniques for generating effective test stimuli",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 5,
      title: "Constrained Random Verification",
      description: "Using constraints to generate intelligent random tests",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 6,
      title: "Introduction to UVM",
      description: "Universal Verification Methodology fundamentals",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 7,
      title: "UVM Components",
      description: "Detailed exploration of UVM component hierarchy",
      estimatedTime: "5 hours",
      completed: false
    },
    {
      id: 8,
      title: "UVM Factories and Configuration",
      description: "Advanced UVM features for flexibility and reuse",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 9,
      title: "Functional Coverage",
      description: "Measuring verification completeness with coverage metrics",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 10,
      title: "Assertion-Based Verification",
      description: "Using assertions to verify design behavior",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 11,
      title: "Formal Verification",
      description: "Mathematical methods to prove design correctness",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 12,
      title: "Protocol Verification",
      description: "Techniques for verifying complex interface protocols",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 13,
      title: "Performance Verification",
      description: "Measuring and verifying performance metrics",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 14,
      title: "Low Power Verification",
      description: "Verifying power management features in designs",
      estimatedTime: "2 hours",
      completed: false
    },
    {
      id: 15,
      title: "Hardware Security Verification",
      description: "Techniques to verify security properties of hardware",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 16,
      title: "Verification Project",
      description: "Build a complete verification environment for a complex design",
      estimatedTime: "8 hours",
      completed: false
    }
  ],
  exercises: [
    {
      id: "ex1",
      title: "SystemVerilog Testbench",
      description: "Build a SystemVerilog testbench for a simple ALU design with automated checking and reporting.",
      difficulty: "Medium",
      type: "Coding",
      points: 100,
      estimatedTime: "3 hours",
      completed: false,
      industryRelevance: "Fundamental skill evaluated in interviews at all verification positions at companies like Intel and AMD."
    },
    {
      id: "ex2",
      title: "Constraint Solver",
      description: "Develop constrained random stimulus for a memory interface with specific address patterns and data relationships.",
      difficulty: "Medium",
      type: "Coding",
      points: 125,
      estimatedTime: "4 hours",
      completed: false,
      industryRelevance: "Constraint programming is a key skill for verification roles at companies like NVIDIA and Qualcomm."
    },
    {
      id: "ex3",
      title: "UVM Environment",
      description: "Create a complete UVM verification environment for an AXI interface with sequences, drivers, and monitors.",
      difficulty: "Hard",
      type: "Project",
      points: 200,
      estimatedTime: "10 hours",
      completed: false,
      industryRelevance: "UVM expertise is the most in-demand verification skill at major semiconductor companies."
    },
    {
      id: "ex4",
      title: "Assertion Library",
      description: "Develop a comprehensive assertion library for a FIFO component with protocol checking capabilities.",
      difficulty: "Hard",
      type: "Project",
      points: 175,
      estimatedTime: "8 hours",
      completed: false,
      industryRelevance: "Assertion-based verification is critical at companies like ARM and Intel for interface verification."
    },
    {
      id: "ex5",
      title: "Coverage Model",
      description: "Implement a functional coverage model for a cache controller that captures all relevant scenarios and corner cases.",
      difficulty: "Very Hard",
      type: "Project",
      points: 250,
      estimatedTime: "12 hours",
      completed: false,
      industryRelevance: "Coverage-driven verification is standard practice at all major semiconductor companies."
    }
  ],
  codeExamples: [
    {
      title: "SystemVerilog Interface",
      code: "interface axi_if #(\n  parameter DATA_WIDTH = 32,\n  parameter ADDR_WIDTH = 32\n)(\n  input clk, rst_n\n);\n  // Signals\n  logic [ADDR_WIDTH-1:0] awaddr;\n  logic [2:0]           awprot;\n  logic                 awvalid;\n  logic                 awready;\n  logic [DATA_WIDTH-1:0] wdata;\n  logic [DATA_WIDTH/8-1:0] wstrb;\n  logic                 wvalid;\n  logic                 wready;\n  logic [1:0]           bresp;\n  logic                 bvalid;\n  logic                 bready;\n  logic [ADDR_WIDTH-1:0] araddr;\n  logic [2:0]           arprot;\n  logic                 arvalid;\n  logic                 arready;\n  logic [DATA_WIDTH-1:0] rdata;\n  logic [1:0]           rresp;\n  logic                 rvalid;\n  logic                 rready;\n  \n  // Clocking blocks for synchronization\n  clocking master_cb @(posedge clk);\n    output awaddr, awprot, awvalid;\n    input  awready;\n    output wdata, wstrb, wvalid;\n    input  wready;\n    input  bresp, bvalid;\n    output bready;\n    output araddr, arprot, arvalid;\n    input  arready;\n    input  rdata, rresp, rvalid;\n    output rready;\n  endclocking\n  \n  clocking slave_cb @(posedge clk);\n    input  awaddr, awprot, awvalid;\n    output awready;\n    input  wdata, wstrb, wvalid;\n    output wready;\n    output bresp, bvalid;\n    input  bready;\n    input  araddr, arprot, arvalid;\n    output arready;\n    output rdata, rresp, rvalid;\n    input  rready;\n  endclocking\n  \n  // Modport declarations\n  modport master (\n    clocking master_cb,\n    input clk, rst_n\n  );\n  \n  modport slave (\n    clocking slave_cb,\n    input clk, rst_n\n  );\nendinterface"
    },
    {
      title: "UVM Sequence",
      code: "class axi_write_sequence extends uvm_sequence #(axi_transaction);\n  `uvm_object_utils(axi_write_sequence)\n  \n  rand int unsigned num_transactions;\n  constraint c_num_trans { num_transactions inside {[5:20]}; }\n  \n  function new(string name = \"axi_write_sequence\");\n    super.new(name);\n  endfunction\n  \n  virtual task body();\n    repeat(num_transactions) begin\n      axi_transaction req = axi_transaction::type_id::create(\"req\");\n      start_item(req);\n      \n      if(!req.randomize() with { \n        req_type == AXI_WRITE; \n        addr inside {[32'h1000:32'h1FFF]};\n      }) begin\n        `uvm_error(get_type_name(), \"Randomization failed\")\n      end\n      \n      finish_item(req);\n    end\n  endtask\nendclass"
    },
    {
      title: "UVM Driver",
      code: "class axi_driver extends uvm_driver #(axi_transaction);\n  `uvm_component_utils(axi_driver)\n  \n  virtual axi_if vif;\n  \n  function new(string name, uvm_component parent);\n    super.new(name, parent);\n  endfunction\n  \n  function void build_phase(uvm_phase phase);\n    super.build_phase(phase);\n    if(!uvm_config_db#(virtual axi_if)::get(this, \"\", \"vif\", vif))\n      `uvm_fatal(\"NO_VIF\", {\"Virtual interface must be set for: \", get_full_name(), \".vif\"})\n  endfunction\n  \n  virtual task run_phase(uvm_phase phase);\n    forever begin\n      seq_item_port.get_next_item(req);\n      drive_transaction(req);\n      seq_item_port.item_done();\n    end\n  endtask\n  \n  virtual task drive_transaction(axi_transaction tr);\n    case(tr.req_type)\n      AXI_WRITE: drive_write(tr);\n      AXI_READ:  drive_read(tr);\n      default: `uvm_error(get_type_name(), $sformatf(\"Unsupported transaction type: %s\", tr.req_type.name()))\n    endcase\n  endtask\n  \n  virtual task drive_write(axi_transaction tr);\n    // Implementation of AXI write protocol\n    // Address phase\n    @(vif.master_cb);\n    vif.master_cb.awaddr  <= tr.addr;\n    vif.master_cb.awprot  <= tr.prot;\n    vif.master_cb.awvalid <= 1'b1;\n    \n    // Wait for awready\n    do @(vif.master_cb); while(!vif.master_cb.awready);\n    vif.master_cb.awvalid <= 1'b0;\n    \n    // Data phase\n    vif.master_cb.wdata  <= tr.data;\n    vif.master_cb.wstrb  <= tr.strb;\n    vif.master_cb.wvalid <= 1'b1;\n    \n    // Wait for wready\n    do @(vif.master_cb); while(!vif.master_cb.wready);\n    vif.master_cb.wvalid <= 1'b0;\n    \n    // Response phase\n    vif.master_cb.bready <= 1'b1;\n    \n    // Wait for bvalid\n    do @(vif.master_cb); while(!vif.master_cb.bvalid);\n    tr.resp = vif.master_cb.bresp;\n    vif.master_cb.bready <= 1'b0;\n  endtask\n  \n  // Similar implementation for drive_read\nendclass"
    },
    {
      title: "SystemVerilog Assertions",
      code: "module fifo_assertions (\n  input logic clk, rst_n,\n  input logic write, read,\n  input logic full, empty,\n  input logic [7:0] write_data,\n  input logic [7:0] read_data,\n  input logic [3:0] count\n);\n\n  // Basic operation assertions\n  property write_when_not_full;\n    @(posedge clk) disable iff(!rst_n)\n    write |-> !full;\n  endproperty\n  \n  property read_when_not_empty;\n    @(posedge clk) disable iff(!rst_n)\n    read |-> !empty;\n  endproperty\n  \n  // Count behavior assertions\n  property count_increment;\n    @(posedge clk) disable iff(!rst_n)\n    (write && !read && !full) |=> (count == $past(count) + 1);\n  endproperty\n  \n  property count_decrement;\n    @(posedge clk) disable iff(!rst_n)\n    (!write && read && !empty) |=> (count == $past(count) - 1);\n  endproperty\n  \n  property count_stable;\n    @(posedge clk) disable iff(!rst_n)\n    ((write && read) || (!write && !read)) |=> (count == $past(count));\n  endproperty\n  \n  // Full/empty flag assertions\n  property full_when_max_count;\n    @(posedge clk) disable iff(!rst_n)\n    (count == 4'hF) |-> full;\n  endproperty\n  \n  property empty_when_zero_count;\n    @(posedge clk) disable iff(!rst_n)\n    (count == 4'h0) |-> empty;\n  endproperty\n  \n  // Bind assertions\n  assert property(write_when_not_full)\n    else $error(\"Writing to FIFO when full\");\n    \n  assert property(read_when_not_empty)\n    else $error(\"Reading from FIFO when empty\");\n    \n  assert property(count_increment)\n    else $error(\"Count not incremented correctly on write\");\n    \n  assert property(count_decrement)\n    else $error(\"Count not decremented correctly on read\");\n    \n  assert property(count_stable)\n    else $error(\"Count changed unexpectedly\");\n    \n  assert property(full_when_max_count)\n    else $error(\"Full flag not set when count is max\");\n    \n  assert property(empty_when_zero_count)\n    else $error(\"Empty flag not set when count is zero\");\n    \n  // Cover properties to verify reachability\n  cover property(full_when_max_count);\n  cover property(empty_when_zero_count);\n  \nendmodule"
    },
    {
      title: "UVM Coverage",
      code: "class axi_coverage extends uvm_subscriber #(axi_transaction);\n  `uvm_component_utils(axi_coverage)\n  \n  axi_transaction tr;\n  \n  // Covergroups and coverpoints\n  covergroup axi_cg;\n    option.per_instance = 1;\n    \n    // Transaction type coverage\n    cp_type: coverpoint tr.req_type {\n      bins read  = {AXI_READ};\n      bins write = {AXI_WRITE};\n    }\n    \n    // Address coverage\n    cp_addr: coverpoint tr.addr {\n      bins low    = {[0:32'h0FFF]};\n      bins mid    = {[32'h1000:32'h1FFF]};\n      bins high   = {[32'h2000:32'hFFFF]};\n      bins others = default;\n    }\n    \n    // Data coverage\n    cp_data: coverpoint tr.data[31:0] {\n      bins zeros  = {0};\n      bins ones   = {32'hFFFFFFFF};\n      bins others = default;\n    }\n    \n    // Protection bits coverage\n    cp_prot: coverpoint tr.prot {\n      bins all_values[] = {[0:7]};\n    }\n    \n    // Response coverage\n    cp_resp: coverpoint tr.resp {\n      bins okay   = {2'b00};\n      bins exokay = {2'b01};\n      bins slverr = {2'b10};\n      bins decerr = {2'b11};\n    }\n    \n    // Cross coverage\n    cx_type_addr: cross cp_type, cp_addr;\n    cx_type_resp: cross cp_type, cp_resp;\n  endgroup\n  \n  function new(string name, uvm_component parent);\n    super.new(name, parent);\n    axi_cg = new();\n  endfunction\n  \n  function void write(axi_transaction t);\n    tr = t;\n    axi_cg.sample();\n  endfunction\n  \n  function void extract_phase(uvm_phase phase);\n    `uvm_info(get_type_name(), $sformatf(\"Coverage: %f%%\", axi_cg.get_coverage()), UVM_LOW)\n  endfunction\nendclass"
    }
  ],
  resources: [
    {
      title: "SystemVerilog for Verification",
      type: "PDF",
      url: "/resources/systemverilog_verification.pdf"
    },
    {
      title: "UVM Cookbook",
      type: "PDF",
      url: "/resources/uvm_cookbook.pdf"
    },
    {
      title: "Assertion-Based Verification Guide",
      type: "PDF",
      url: "/resources/abv_guide.pdf"
    },
    {
      title: "Verification Career Path Guide",
      type: "PDF",
      url: "/resources/verification_career_guide.pdf"
    },
    {
      title: "Top Verification Interview Questions",
      type: "PDF",
      url: "/resources/verification_interview_prep.pdf"
    },
    {
      title: "Formal Verification Techniques",
      type: "PDF",
      url: "/resources/formal_verification.pdf"
    },
    {
      title: "Verification Salary Survey 2025",
      type: "PDF",
      url: "/resources/verification_salary_survey.pdf"
    }
  ],
  relatedModules: [
    {
      id: "verilog-fundamentals",
      title: "Verilog Fundamentals",
      description: "Master the basics of Verilog HDL and digital design.",
      level: "Beginner"
    },
    {
      id: "riscv-processor",
      title: "RISC-V Processor Design",
      description: "Learn how to design and implement a RISC-V processor using Verilog HDL.",
      level: "Advanced"
    },
    {
      id: "fpga-design",
      title: "FPGA Design and Implementation",
      description: "Learn to implement designs on FPGA platforms.",
      level: "Intermediate"
    },
    {
      id: "soc-verification",
      title: "Advanced SoC Verification",
      description: "Specialized techniques for verifying complex SoC designs.",
      level: "Advanced"
    }
  ],
  
  // Industry impact section
  industryImpact: {
    title: "Verification Impact & Market Opportunities",
    description: "Verification is a critical discipline in the semiconductor industry, accounting for 60-70% of the total design effort for modern chips.",
    marketStats: [
      {
        stat: "70%",
        description: "Percentage of project resources typically allocated to verification"
      },
      {
        stat: "2:1",
        description: "Typical ratio of verification engineers to design engineers"
      },
      {
        stat: "$500M+",
        description: "Annual market for verification tools and services"
      },
      {
        stat: "15-20%",
        description: "Annual growth in verification engineer demand"
      }
    ],
    pioneering: [
      {
        company: "Synopsys",
        impact: "Leading verification platform provider with VCS simulator and VC Formal",
        expertise: "Comprehensive verification tools and methodologies"
      },
      {
        company: "Cadence",
        impact: "Xcelium simulator and JasperGold formal verification tools",
        expertise: "System-level verification and advanced debug capabilities"
      },
      {
        company: "Siemens EDA",
        impact: "Questa platform for functional verification and formal tools",
        expertise: "Mixed-signal verification and portable stimulus"
      },
      {
        company: "OneSpin",
        impact: "Specialized formal verification solutions",
        expertise: "Safety-critical verification and RISC-V formal verification"
      }
    ],
    jobGrowthAreas: [
      {
        area: "Automotive Verification",
        description: "ISO 26262 functional safety verification for autonomous driving systems",
        skill: "Functional safety verification, fault simulation, ISO 26262 knowledge"
      },
      {
        area: "Security Verification",
        description: "Hardware security verification for encryption and secure boot",
        skill: "Security assertions, side-channel analysis, formal proof techniques"
      },
      {
        area: "AI Hardware Verification",
        description: "Verifying machine learning accelerators and neural network processors",
        skill: "Performance verification, numerical accuracy analysis, ML algorithms"
      },
      {
        area: "Cloud/HPC Hardware",
        description: "Verification of high-performance computing hardware",
        skill: "Cache coherency verification, multi-core verification, system performance analysis"
      }
    ]
  }
}; 