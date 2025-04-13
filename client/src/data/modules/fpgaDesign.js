/**
 * FPGA Design and Implementation Module
 * 
 * This module covers comprehensive FPGA design from basics to advanced implementation.
 */

export const fpgaDesign = {
  id: "fpga-design",
  title: "FPGA Design and Implementation",
  description: "Master FPGA design techniques and prepare for high-demand roles in FPGA development",
  image: "https://images.unsplash.com/photo-1573164574472-797cdf4a583a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  level: "Intermediate",
  duration: "4 weeks",
  rating: 4.9,
  studentsCount: 42,
  completed: 0,
  updatedAt: "2025-04-12",
  bookmarked: false,
  topics: [
    "FPGA Architecture",
    "RTL Design",
    "Timing Constraints",
    "Synthesis Optimization",
    "Static Timing Analysis",
    "Clock Domain Crossing"
  ],
  lessons: 15,
  exercises: 8,
  students: 4250,
  instructor: {
    name: "Prof. Robert Anderson",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Prof. Anderson is an FPGA specialist with over 20 years of industry experience designing high-performance FPGA systems. He has worked on designs for aerospace, telecommunications, and high-frequency trading applications.",
    credentials: [
      "Ph.D. in Electrical Engineering, Stanford University",
      "Senior FPGA Designer at Xilinx (2008-2016)",
      "Author of 'High-Performance FPGA Design' (2019)",
      "IEEE Fellow with 12 patents in FPGA architecture"
    ]
  },
  overview: "This comprehensive module teaches you Field-Programmable Gate Array (FPGA) design and implementation from the ground up. Starting with FPGA architecture fundamentals, you'll progress through RTL design, synthesis, timing constraints, and advanced implementation techniques. The course emphasizes practical skills required in industry, including design for high performance, low power consumption, and efficient resource utilization. FPGA engineering is one of the fastest-growing fields in digital design, with applications ranging from edge AI to high-frequency trading systems. You'll gain hands-on experience with industry-standard FPGA tools including Vivado, Quartus, and complete real-world design projects that can showcase your skills to potential employers.",
  
  careerGuide: {
    title: "FPGA Development Career Path",
    description: "FPGA development is experiencing rapid growth with applications expanding beyond traditional areas into AI acceleration, high-frequency trading, and cloud computing infrastructure.",
    jobRoles: [
      {
        title: "FPGA Design Engineer",
        description: "Develop and implement digital designs on FPGA platforms",
        averageSalary: "$115,000 - $155,000",
        requiredSkills: ["Verilog/VHDL", "RTL Design", "Synthesis", "Timing Analysis"],
        keyCompanies: ["Intel", "AMD/Xilinx", "Lattice Semiconductor", "Microchip", "Microsoft"]
      },
      {
        title: "FPGA Architect",
        description: "Design system-level FPGA architectures for complex applications",
        averageSalary: "$145,000 - $185,000",
        requiredSkills: ["System Architecture", "Performance Optimization", "IP Integration", "High-Speed Interfaces"],
        keyCompanies: ["NVIDIA", "Google", "Amazon", "Arista Networks", "Cisco"]
      },
      {
        title: "Hardware Accelerator Engineer",
        description: "Design specialized FPGA accelerators for AI, video processing, and data analytics",
        averageSalary: "$135,000 - $180,000",
        requiredSkills: ["Algorithm Optimization", "HLS", "Parallel Computing", "Machine Learning"],
        keyCompanies: ["Microsoft Azure", "AWS", "Baidu", "Alibaba", "Meta"]
      },
      {
        title: "FPGA Verification Engineer",
        description: "Verify complex FPGA designs using simulation and hardware validation",
        averageSalary: "$120,000 - $160,000",
        requiredSkills: ["SystemVerilog", "UVM", "FPGA Prototyping", "Hardware Debugging"],
        keyCompanies: ["Samsung", "Marvell", "Broadcom", "Nokia", "Ericsson"]
      }
    ],
    industryTrends: [
      {
        trend: "FPGAs in Cloud Computing",
        description: "Major cloud providers offering FPGA instances for acceleration",
        impact: "Growing demand for FPGA engineers with cloud infrastructure and virtualization knowledge"
      },
      {
        trend: "AI/ML Acceleration",
        description: "FPGAs as accelerators for neural network inference and training",
        impact: "New roles combining FPGA expertise with machine learning knowledge"
      },
      {
        trend: "High-Level Synthesis",
        description: "Design abstractions moving from RTL to C/C++/OpenCL with HLS",
        impact: "Increasing demand for engineers who understand both software and hardware"
      },
      {
        trend: "Open Source FPGA Toolchains",
        description: "Growing ecosystem of open-source FPGA design tools",
        impact: "New opportunities in tool development and FPGA architecture research"
      }
    ],
    interviewPreparation: {
      technicalTopics: [
        "FPGA architecture and resource types",
        "Synchronous design principles and clock domain crossing",
        "Timing closure techniques",
        "RTL optimization for performance and area",
        "Memory architecture and optimization",
        "DSP implementation techniques",
        "High-speed IO interfaces",
        "SoC design with embedded processors",
        "FPGA security considerations",
        "High-Level Synthesis methodologies"
      ],
      commonQuestions: [
        "Explain the differences between FPGA and ASIC designs and when you would choose one over the other.",
        "How would you handle clock domain crossing in an FPGA design?",
        "Describe your approach to debugging timing failures in an FPGA implementation.",
        "What techniques would you use to optimize an FPGA design for low power consumption?",
        "How would you implement a high-performance DSP algorithm on an FPGA?",
        "Explain the tradeoffs between using Block RAM vs. distributed RAM in an FPGA design.",
        "How would you structure a complex FPGA project with multiple teams working simultaneously?",
        "Describe your experience with High-Level Synthesis and when you would use it."
      ],
      technicalChallenges: [
        "Implement a pipelined FFT module optimized for FPGA implementation",
        "Design a memory controller with optimal resource utilization",
        "Create a high-throughput data processing pipeline with backpressure support",
        "Develop a clock domain crossing module with proper synchronization",
        "Implement a configurable filter with runtime parameter updates"
      ]
    }
  },
  
  prerequisites: [
    "Digital logic fundamentals",
    "Basic knowledge of Verilog or VHDL",
    "Computer architecture concepts",
    "Familiarity with binary number systems",
    "Completion of Verilog Fundamentals module recommended"
  ],
  skills: [
    "FPGA Architecture",
    "RTL Design",
    "Timing Constraints",
    "Synthesis Optimization",
    "Static Timing Analysis",
    "Clock Domain Crossing",
    "FPGA Debugging",
    "Resource Optimization",
    "High-Speed Interface Design",
    "DSP Implementation",
    "Memory Architecture",
    "Power Optimization",
    "High-Level Synthesis",
    "FPGA SoC Design",
    "PCB Design for FPGAs",
    "Design Documentation"
  ],
  chapters: [
    {
      id: 1,
      title: "FPGA Architecture Fundamentals",
      description: "Introduction to FPGA structure, resources, and capabilities",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 2,
      title: "FPGA Design Flow",
      description: "Overview of the complete FPGA design and implementation process",
      estimatedTime: "2 hours",
      completed: false
    },
    {
      id: 3,
      title: "RTL Design Best Practices",
      description: "Guidelines for creating efficient and synthesizable RTL code",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 4,
      title: "Simulation Methodologies",
      description: "Techniques for effective simulation of FPGA designs",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 5,
      title: "Timing Constraints",
      description: "Defining and managing timing constraints for reliable operation",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 6,
      title: "Synthesis Optimization",
      description: "Techniques to optimize synthesis results for performance and area",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 7,
      title: "Static Timing Analysis",
      description: "Understanding and resolving timing issues in FPGA designs",
      estimatedTime: "5 hours",
      completed: false
    },
    {
      id: 8,
      title: "Clock Domain Crossing",
      description: "Reliable techniques for crossing clock domains in FPGAs",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 9,
      title: "Memory Implementation",
      description: "Efficient use of memory resources in FPGA designs",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 10,
      title: "DSP Implementation",
      description: "Implementing digital signal processing on FPGAs",
      estimatedTime: "5 hours",
      completed: false
    },
    {
      id: 11,
      title: "High-Speed Interfaces",
      description: "Designing reliable high-speed interfaces on FPGAs",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 12,
      title: "Power Optimization",
      description: "Techniques for reducing power consumption in FPGA designs",
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: 13,
      title: "High-Level Synthesis",
      description: "Using HLS tools to implement algorithms on FPGAs",
      estimatedTime: "5 hours",
      completed: false
    },
    {
      id: 14,
      title: "FPGA Debugging",
      description: "Advanced methods for debugging FPGA implementations",
      estimatedTime: "4 hours",
      completed: false
    },
    {
      id: 15,
      title: "FPGA SoC Design",
      description: "Integrating processors and peripherals into FPGA designs",
      estimatedTime: "6 hours",
      completed: false
    },
    {
      id: 16,
      title: "Capstone Project",
      description: "Complete implementation of a comprehensive FPGA system",
      estimatedTime: "10 hours",
      completed: false
    }
  ],
  exercises: [
    {
      id: "ex1",
      title: "Clock Domain Synchronizer",
      description: "Implement a reliable clock domain crossing (CDC) synchronizer with handshaking for data transfer between domains.",
      difficulty: "Medium",
      type: "Coding",
      points: 100,
      estimatedTime: "3 hours",
      completed: false,
      industryRelevance: "CDC handling is a critical skill evaluated in FPGA interviews at all major companies including Intel and Xilinx."
    },
    {
      id: "ex2",
      title: "Pipelined FFT Implementation",
      description: "Design a pipelined Fast Fourier Transform module optimized for FPGA implementation with configurable data width.",
      difficulty: "Hard",
      type: "Project",
      points: 150,
      estimatedTime: "8 hours",
      completed: false,
      industryRelevance: "FFT implementation showcases DSP skills highly valued at companies like Xilinx and in signal processing applications."
    },
    {
      id: "ex3",
      title: "UART with FIFO Buffers",
      description: "Create a UART controller with configurable baud rate and FIFO buffers for transmission and reception.",
      difficulty: "Medium",
      type: "Project",
      points: 125,
      estimatedTime: "6 hours",
      completed: false,
      industryRelevance: "Communication protocols implementation is a fundamental skill for FPGA roles at networking companies like Cisco."
    },
    {
      id: "ex4",
      title: "Memory Controller",
      description: "Implement a DDR memory controller with efficient bandwidth utilization and support for burst transactions.",
      difficulty: "Very Hard",
      type: "Project",
      points: 200,
      estimatedTime: "12 hours",
      completed: false,
      industryRelevance: "Memory controller design is essential for high-performance systems and valued by companies like NVIDIA and Microsoft."
    },
    {
      id: "ex5",
      title: "Ethernet MAC Implementation",
      description: "Design an Ethernet MAC layer supporting Gigabit operation with proper frame handling and checksumming.",
      difficulty: "Very Hard",
      type: "Project",
      points: 250,
      estimatedTime: "15 hours",
      completed: false,
      industryRelevance: "Ethernet interface implementation is crucial for networking applications at companies like Arista Networks and Cisco."
    }
  ],
  codeExamples: [
    {
      title: "Clock Domain Crossing",
      code: "module cdc_synchronizer #(\n  parameter WIDTH = 8\n)(\n  input                  src_clk,\n  input                  dst_clk,\n  input                  src_rst_n,\n  input                  dst_rst_n,\n  input  [WIDTH-1:0]     src_data,\n  input                  src_valid,\n  output                 src_ready,\n  output [WIDTH-1:0]     dst_data,\n  output                 dst_valid,\n  input                  dst_ready\n);\n\n  // Source domain signals\n  reg [WIDTH-1:0] src_data_reg;\n  reg             src_toggle_ff;\n  wire            src_toggle_next;\n  wire            src_ack_toggle;\n  reg             src_ack_ff1, src_ack_ff2;\n  \n  // Destination domain signals\n  reg [WIDTH-1:0] dst_data_reg;\n  reg             dst_valid_reg;\n  reg             dst_toggle_ff1, dst_toggle_ff2, dst_toggle_ff3;\n  wire            dst_toggle_pulse;\n  reg             dst_ack_toggle;\n  \n  // Source domain logic\n  assign src_toggle_next = src_valid & src_ready;\n  assign src_ready = (src_ack_ff2 == src_toggle_ff) & ~src_valid;\n  \n  always @(posedge src_clk or negedge src_rst_n) begin\n    if (~src_rst_n) begin\n      src_data_reg  <= {WIDTH{1'b0}};\n      src_toggle_ff <= 1'b0;\n      src_ack_ff1   <= 1'b0;\n      src_ack_ff2   <= 1'b0;\n    end else begin\n      src_ack_ff1 <= dst_ack_toggle;\n      src_ack_ff2 <= src_ack_ff1;\n      \n      if (src_toggle_next) begin\n        src_data_reg  <= src_data;\n        src_toggle_ff <= ~src_toggle_ff;\n      end\n    end\n  end\n  \n  // Destination domain logic\n  assign dst_toggle_pulse = dst_toggle_ff2 ^ dst_toggle_ff3;\n  assign dst_data = dst_data_reg;\n  assign dst_valid = dst_valid_reg;\n  \n  always @(posedge dst_clk or negedge dst_rst_n) begin\n    if (~dst_rst_n) begin\n      dst_toggle_ff1 <= 1'b0;\n      dst_toggle_ff2 <= 1'b0;\n      dst_toggle_ff3 <= 1'b0;\n      dst_data_reg   <= {WIDTH{1'b0}};\n      dst_valid_reg  <= 1'b0;\n      dst_ack_toggle <= 1'b0;\n    end else begin\n      // Synchronize toggle signal\n      dst_toggle_ff1 <= src_toggle_ff;\n      dst_toggle_ff2 <= dst_toggle_ff1;\n      dst_toggle_ff3 <= dst_toggle_ff2;\n      \n      // Handle new data\n      if (dst_toggle_pulse) begin\n        dst_data_reg <= src_data_reg;\n        dst_valid_reg <= 1'b1;\n      end else if (dst_valid_reg && dst_ready) begin\n        dst_valid_reg <= 1'b0;\n        dst_ack_toggle <= dst_toggle_ff3;\n      end\n    end\n  end\nendmodule"
    },
    {
      title: "Dual-Clock FIFO",
      code: "module dual_clock_fifo #(\n  parameter DATA_WIDTH = 32,\n  parameter FIFO_DEPTH = 16  // Must be power of 2\n)(\n  // Write domain\n  input                       wr_clk,\n  input                       wr_rst_n,\n  input                       wr_en,\n  input      [DATA_WIDTH-1:0] wr_data,\n  output reg                  wr_full,\n  output     [$clog2(FIFO_DEPTH):0] wr_count,\n  \n  // Read domain\n  input                       rd_clk,\n  input                       rd_rst_n,\n  input                       rd_en,\n  output reg [DATA_WIDTH-1:0] rd_data,\n  output reg                  rd_empty,\n  output     [$clog2(FIFO_DEPTH):0] rd_count\n);\n\n  // Local parameters\n  localparam ADDR_WIDTH = $clog2(FIFO_DEPTH);\n  \n  // Memory array\n  reg [DATA_WIDTH-1:0] mem [0:FIFO_DEPTH-1];\n  \n  // Write domain pointers and flags\n  reg [ADDR_WIDTH:0] wr_ptr_bin;\n  wire [ADDR_WIDTH:0] wr_ptr_gray_next;\n  reg [ADDR_WIDTH:0] wr_ptr_gray;\n  reg [ADDR_WIDTH:0] rd_ptr_gray_sync1, rd_ptr_gray_sync2;\n  wire [ADDR_WIDTH:0] rd_ptr_bin_sync;\n  \n  // Read domain pointers and flags\n  reg [ADDR_WIDTH:0] rd_ptr_bin;\n  wire [ADDR_WIDTH:0] rd_ptr_gray_next;\n  reg [ADDR_WIDTH:0] rd_ptr_gray;\n  reg [ADDR_WIDTH:0] wr_ptr_gray_sync1, wr_ptr_gray_sync2;\n  wire [ADDR_WIDTH:0] wr_ptr_bin_sync;\n  \n  // Binary to Gray code conversion\n  function [ADDR_WIDTH:0] bin_to_gray(input [ADDR_WIDTH:0] bin);\n    bin_to_gray = bin ^ (bin >> 1);\n  endfunction\n  \n  // Gray to Binary code conversion\n  function [ADDR_WIDTH:0] gray_to_bin(input [ADDR_WIDTH:0] gray);\n    integer i;\n    gray_to_bin = gray;\n    for (i = 1; i <= ADDR_WIDTH; i = i + 1)\n      gray_to_bin = gray_to_bin ^ (gray >> i);\n  endfunction\n  \n  // Write domain logic\n  assign wr_ptr_gray_next = bin_to_gray(wr_ptr_bin + wr_en);\n  assign rd_ptr_bin_sync = gray_to_bin(rd_ptr_gray_sync2);\n  assign wr_count = wr_ptr_bin - rd_ptr_bin_sync;\n  \n  always @(posedge wr_clk or negedge wr_rst_n) begin\n    if (~wr_rst_n) begin\n      wr_ptr_bin <= 0;\n      wr_ptr_gray <= 0;\n      rd_ptr_gray_sync1 <= 0;\n      rd_ptr_gray_sync2 <= 0;\n      wr_full <= 0;\n    end else begin\n      // Synchronize read pointer\n      rd_ptr_gray_sync1 <= rd_ptr_gray;\n      rd_ptr_gray_sync2 <= rd_ptr_gray_sync1;\n      \n      // Update write pointer\n      if (wr_en && !wr_full) begin\n        mem[wr_ptr_bin[ADDR_WIDTH-1:0]] <= wr_data;\n        wr_ptr_bin <= wr_ptr_bin + 1'b1;\n        wr_ptr_gray <= wr_ptr_gray_next;\n      end\n      \n      // Update full flag\n      wr_full <= (wr_ptr_gray_next == {~rd_ptr_gray_sync2[ADDR_WIDTH:ADDR_WIDTH-1], rd_ptr_gray_sync2[ADDR_WIDTH-2:0]});\n    end\n  end\n  \n  // Read domain logic\n  assign rd_ptr_gray_next = bin_to_gray(rd_ptr_bin + rd_en);\n  assign wr_ptr_bin_sync = gray_to_bin(wr_ptr_gray_sync2);\n  assign rd_count = wr_ptr_bin_sync - rd_ptr_bin;\n  \n  always @(posedge rd_clk or negedge rd_rst_n) begin\n    if (~rd_rst_n) begin\n      rd_ptr_bin <= 0;\n      rd_ptr_gray <= 0;\n      wr_ptr_gray_sync1 <= 0;\n      wr_ptr_gray_sync2 <= 0;\n      rd_empty <= 1;\n      rd_data <= 0;\n    end else begin\n      // Synchronize write pointer\n      wr_ptr_gray_sync1 <= wr_ptr_gray;\n      wr_ptr_gray_sync2 <= wr_ptr_gray_sync1;\n      \n      // Update read pointer and output data\n      if (rd_en && !rd_empty) begin\n        rd_data <= mem[rd_ptr_bin[ADDR_WIDTH-1:0]];\n        rd_ptr_bin <= rd_ptr_bin + 1'b1;\n        rd_ptr_gray <= rd_ptr_gray_next;\n      end\n      \n      // Update empty flag\n      rd_empty <= (rd_ptr_gray_next == wr_ptr_gray_sync2);\n    end\n  end\nendmodule"
    },
    {
      title: "Pipelined Multiplier",
      code: "module pipelined_multiplier #(\n  parameter WIDTH = 16,\n  parameter STAGES = 4\n)(\n  input                   clk,\n  input                   rst_n,\n  input                   en,\n  input  [WIDTH-1:0]      a,\n  input  [WIDTH-1:0]      b,\n  output [2*WIDTH-1:0]    result,\n  output                  valid\n);\n\n  // Calculate bits per stage\n  localparam BITS_PER_STAGE = WIDTH / STAGES;\n  localparam REM_BITS = WIDTH % STAGES;\n  \n  // Pipeline registers\n  reg [WIDTH-1:0] a_reg [0:STAGES-1];\n  reg [WIDTH-1:0] b_shift [0:STAGES-1];\n  reg [2*WIDTH-1:0] partial_products [0:STAGES-1];\n  reg [STAGES-1:0] valid_pipeline;\n  \n  // Result assignment\n  assign result = partial_products[STAGES-1];\n  assign valid = valid_pipeline[STAGES-1];\n  \n  // First stage\n  always @(posedge clk or negedge rst_n) begin\n    if (~rst_n) begin\n      a_reg[0] <= 0;\n      b_shift[0] <= 0;\n      partial_products[0] <= 0;\n      valid_pipeline[0] <= 0;\n    end else if (en) begin\n      a_reg[0] <= a;\n      b_shift[0] <= b;\n      \n      // First partial product calculation\n      partial_products[0] <= a[BITS_PER_STAGE-1:0] * b;\n      valid_pipeline[0] <= 1'b1;\n    end else begin\n      valid_pipeline[0] <= 1'b0;\n    end\n  end\n  \n  // Intermediate stages\n  genvar i;\n  generate\n    for (i = 1; i < STAGES; i = i + 1) begin : gen_stages\n      always @(posedge clk or negedge rst_n) begin\n        if (~rst_n) begin\n          a_reg[i] <= 0;\n          b_shift[i] <= 0;\n          partial_products[i] <= 0;\n          valid_pipeline[i] <= 0;\n        end else begin\n          a_reg[i] <= a_reg[i-1];\n          b_shift[i] <= b_shift[i-1];\n          valid_pipeline[i] <= valid_pipeline[i-1];\n          \n          if (valid_pipeline[i-1]) begin\n            // Calculate this stage's contribution to the product\n            if (i == STAGES-1 && REM_BITS > 0) begin\n              // Handle remaining bits in last stage\n              partial_products[i] <= partial_products[i-1] + \n                                   ((a_reg[i-1][WIDTH-1:WIDTH-REM_BITS] * \n                                     b_shift[i-1]) << ((i * BITS_PER_STAGE)));\n            end else begin\n              partial_products[i] <= partial_products[i-1] + \n                                   ((a_reg[i-1][(i+1)*BITS_PER_STAGE-1:i*BITS_PER_STAGE] * \n                                     b_shift[i-1]) << ((i * BITS_PER_STAGE)));\n            end\n          end\n        end\n      end\n    end\n  endgenerate\nendmodule"
    },
    {
      title: "Block RAM Controller",
      code: "module block_ram_controller #(\n  parameter DATA_WIDTH = 32,\n  parameter ADDR_WIDTH = 10,  // 1K words\n  parameter ENABLE_DUAL_PORT = 1\n)(\n  input                       clk,\n  input                       rst_n,\n  \n  // Port A (Read/Write)\n  input                       a_en,\n  input                       a_we,\n  input      [ADDR_WIDTH-1:0] a_addr,\n  input      [DATA_WIDTH-1:0] a_data_in,\n  output reg [DATA_WIDTH-1:0] a_data_out,\n  \n  // Port B (Read Only if ENABLE_DUAL_PORT=1)\n  input                       b_en,\n  input      [ADDR_WIDTH-1:0] b_addr,\n  output reg [DATA_WIDTH-1:0] b_data_out\n);\n\n  // Memory array\n  reg [DATA_WIDTH-1:0] ram [(2**ADDR_WIDTH)-1:0];\n  \n  // Port A logic\n  always @(posedge clk) begin\n    if (a_en) begin\n      if (a_we) begin\n        ram[a_addr] <= a_data_in;\n        a_data_out <= a_data_in;  // Write-through behavior\n      end else begin\n        a_data_out <= ram[a_addr];\n      end\n    end\n  end\n  \n  // Port B logic (if enabled)\n  generate\n    if (ENABLE_DUAL_PORT) begin\n      always @(posedge clk) begin\n        if (b_en) begin\n          b_data_out <= ram[b_addr];\n        end\n      end\n    end else begin\n      always @* begin\n        b_data_out = {DATA_WIDTH{1'b0}};\n      end\n    end\n  endgenerate\n  \n  // Optional initialization for simulation\n  integer i;\n  initial begin\n    for (i = 0; i < 2**ADDR_WIDTH; i = i + 1) begin\n      ram[i] = {DATA_WIDTH{1'b0}};\n    end\n  end\nendmodule"
    },
    {
      title: "AXI Stream FIFO",
      code: "module axi_stream_fifo #(\n  parameter DATA_WIDTH = 32,\n  parameter FIFO_DEPTH = 32,\n  parameter PROG_FULL_THRESH = FIFO_DEPTH - 4,\n  parameter PROG_EMPTY_THRESH = 4\n)(\n  input                       clk,\n  input                       rst_n,\n  \n  // AXI Stream input interface\n  input      [DATA_WIDTH-1:0] s_axis_tdata,\n  input                       s_axis_tvalid,\n  input                       s_axis_tlast,\n  output                      s_axis_tready,\n  \n  // AXI Stream output interface\n  output     [DATA_WIDTH-1:0] m_axis_tdata,\n  output                      m_axis_tvalid,\n  output                      m_axis_tlast,\n  input                       m_axis_tready,\n  \n  // Status signals\n  output                      fifo_full,\n  output                      fifo_empty,\n  output                      fifo_prog_full,\n  output                      fifo_prog_empty,\n  output     [$clog2(FIFO_DEPTH):0] fifo_count\n);\n\n  // Memory array\n  reg [DATA_WIDTH:0] fifo_mem [0:FIFO_DEPTH-1];  // +1 bit for tlast\n  \n  // Pointers\n  reg [$clog2(FIFO_DEPTH):0] wr_ptr;\n  reg [$clog2(FIFO_DEPTH):0] rd_ptr;\n  \n  // Status signals\n  wire [$clog2(FIFO_DEPTH):0] fifo_count_int;\n  \n  // Combinational logic\n  assign fifo_count_int = wr_ptr - rd_ptr;\n  assign fifo_full = fifo_count_int == FIFO_DEPTH;\n  assign fifo_empty = fifo_count_int == 0;\n  assign fifo_prog_full = fifo_count_int >= PROG_FULL_THRESH;\n  assign fifo_prog_empty = fifo_count_int <= PROG_EMPTY_THRESH;\n  assign fifo_count = fifo_count_int;\n  \n  // AXI Stream interfaces\n  assign s_axis_tready = ~fifo_full;\n  assign m_axis_tvalid = ~fifo_empty;\n  assign m_axis_tdata = fifo_mem[rd_ptr[$clog2(FIFO_DEPTH)-1:0]][DATA_WIDTH-1:0];\n  assign m_axis_tlast = fifo_mem[rd_ptr[$clog2(FIFO_DEPTH)-1:0]][DATA_WIDTH];\n  \n  // Write operation\n  always @(posedge clk or negedge rst_n) begin\n    if (~rst_n) begin\n      wr_ptr <= 0;\n    end else begin\n      if (s_axis_tvalid && s_axis_tready) begin\n        fifo_mem[wr_ptr[$clog2(FIFO_DEPTH)-1:0]] <= {s_axis_tlast, s_axis_tdata};\n        wr_ptr <= wr_ptr + 1'b1;\n      end\n    end\n  end\n  \n  // Read operation\n  always @(posedge clk or negedge rst_n) begin\n    if (~rst_n) begin\n      rd_ptr <= 0;\n    end else begin\n      if (m_axis_tvalid && m_axis_tready) begin\n        rd_ptr <= rd_ptr + 1'b1;\n      end\n    end\n  end\nendmodule"
    }
  ],
  resources: [
    {
      title: "FPGA Design Guidelines",
      type: "PDF",
      url: "/resources/fpga_design_guidelines.pdf"
    },
    {
      title: "Timing Closure Cookbook",
      type: "PDF",
      url: "/resources/timing_closure_cookbook.pdf"
    },
    {
      title: "Industry-Standard FPGA Patterns",
      type: "PDF",
      url: "/resources/fpga_design_patterns.pdf"
    },
    {
      title: "FPGA Career Path Guide",
      type: "PDF",
      url: "/resources/fpga_career_guide.pdf"
    },
    {
      title: "Top FPGA Interview Questions",
      type: "PDF",
      url: "/resources/fpga_interview_prep.pdf"
    },
    {
      title: "FPGA Design for Performance",
      type: "PDF",
      url: "/resources/fpga_performance_optimization.pdf"
    },
    {
      title: "FPGA Design for Low Power",
      type: "PDF",
      url: "/resources/fpga_low_power_design.pdf"
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
      id: "system-verification",
      title: "System Verification Essentials",
      description: "Master hardware verification methodologies for digital designs.",
      level: "Intermediate"
    },
    {
      id: "high-level-synthesis",
      title: "High-Level Synthesis",
      description: "Learn to design FPGAs using C/C++ and HLS methodologies.",
      level: "Intermediate"
    },
    {
      id: "advanced-fpga-design",
      title: "Advanced FPGA Design",
      description: "Advanced techniques for high-performance FPGA systems.",
      level: "Advanced"
    }
  ],
  
  // Industry impact section
  industryImpact: {
    title: "FPGA Industry Impact & Market Opportunities",
    description: "FPGAs are transforming industries from cloud computing to AI acceleration, creating diverse career opportunities across multiple sectors.",
    marketStats: [
      {
        stat: "$11.2B",
        description: "Global FPGA market size in 2024"
      },
      {
        stat: "14.2%",
        description: "Projected annual growth rate through 2030"
      },
      {
        stat: "35%",
        description: "Growth in FPGA job postings over past 2 years"
      },
      {
        stat: "200+",
        description: "Major companies actively recruiting FPGA engineers"
      }
    ],
    applicationAreas: [
      {
        area: "Cloud Computing",
        description: "FPGAs as flexible accelerators in cloud data centers",
        companies: ["Microsoft Azure", "AWS", "Alibaba Cloud", "Baidu"]
      },
      {
        area: "AI/ML Acceleration",
        description: "Custom inference engines and neural network accelerators",
        companies: ["Intel", "Xilinx/AMD", "Google", "Mipsology"]
      },
      {
        area: "High-Frequency Trading",
        description: "Ultra-low latency trading systems and market data processing",
        companies: ["Citadel", "Jump Trading", "Hudson River Trading", "Tower Research"]
      },
      {
        area: "Communications",
        description: "5G infrastructure, networking equipment, and software-defined radio",
        companies: ["Nokia", "Ericsson", "Cisco", "Xilinx/AMD"]
      },
      {
        area: "Aerospace & Defense",
        description: "Radar systems, secure communications, and signal processing",
        companies: ["Lockheed Martin", "Northrop Grumman", "BAE Systems", "Raytheon"]
      }
    ],
    certifications: [
      {
        name: "Xilinx Certified FPGA Designer",
        value: "Industry-recognized credential for Xilinx FPGA expertise",
        salary_impact: "+15% average salary premium"
      },
      {
        name: "Intel FPGA Professional",
        value: "Certification for Intel/Altera FPGA design proficiency",
        salary_impact: "+12% average salary premium"
      },
      {
        name: "Certified FPGA Architect",
        value: "Advanced certification for system-level FPGA design",
        salary_impact: "+20% average salary premium"
      }
    ]
  }
}; 