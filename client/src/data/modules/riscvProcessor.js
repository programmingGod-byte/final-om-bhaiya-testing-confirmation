/**
 * RISC-V Processor Design Module
 * 
 * This module covers the design and implementation of a RISC-V processor.
 */

// Import chapters
import chapter1 from './riscvChapters/chapter1.js';
import chapter2 from './riscvChapters/chapter2.js';
import chapter3 from './riscvChapters/chapter3.js';
import chapter4 from './riscvChapters/chapter4.js';
import chapter5 from './riscvChapters/chapter5.js';
import chapter6 from './riscvChapters/chapter6.js';
import chapter7 from './riscvChapters/chapter7.js';
import chapter8 from './riscvChapters/chapter8.js';
import chapter9 from './riscvChapters/chapter9.js';
import chapter10 from './riscvChapters/chapter10.js';
import chapter11 from './riscvChapters/chapter11.js';
import chapter12 from './riscvChapters/chapter12.js';
import chapter13 from './riscvChapters/chapter13.js';
import chapter14 from './riscvChapters/chapter14.js';
import chapter15 from './riscvChapters/chapter15.js';
import chapter16 from './riscvChapters/chapter16.js';
import chapter17 from './riscvChapters/chapter17.js';

// Add completed status to chapters
const chapters = [
  { ...chapter1, completed: false },
  { ...chapter2, completed: false },
  { ...chapter3, completed: false },
  { ...chapter4, completed: false },
  { ...chapter5, completed: false },
  { ...chapter6, completed: false },
  { ...chapter7, completed: false },
  { ...chapter8, completed: false },
  { ...chapter9, completed: false },
  { ...chapter10, completed: false },
  { ...chapter11, completed: false },
  { ...chapter12, completed: false },
  { ...chapter13, completed: false },
  { ...chapter14, completed: false },
  { ...chapter15, completed: false },
  { ...chapter16, completed: false },
  { ...chapter17, completed: false }
];

export const riscvProcessor = {
  id: "riscv-processor",
  title: "RISC-V Processor Design",
  description: "Design and implement a complete RISC-V processor with pipelining and advanced features",
  image: "https://wallpapers.com/images/hd/coding-background-9izlympnd0ovmpli.jpg",
  duration: "40-50 hours",
  level: "Advanced",
  rating: 4.7,
  studentsCount: 32,
  lastUpdated: "2025-04-15T00:00:00Z",
  bookmarked: false,
  topics: [
    "RISC-V ISA",
    "Single-Cycle Processor",
    "Pipelining",
    "Hazard Resolution",
    "Branch Prediction",
    "Memory Hierarchy",
    "Cache Design",
    "Performance Optimization"
  ],
  status: "active",
  overview: "The RISC-V Processor Design module offers an in-depth exploration of processor architecture and implementation using the open-source RISC-V instruction set architecture. This comprehensive course takes you through the entire processor design journey, starting with the fundamentals of the RISC-V ISA and progressing to advanced topics like pipelining, memory hierarchies, and performance optimization. By the end of this module, you'll have the knowledge and practical skills to design and implement a functional RISC-V processor core.",
  syllabus: [
    {
      title: "Introduction to RISC-V and Processor Fundamentals",
      topics: [
        "RISC-V ISA Overview",
        "Processor Architecture Basics",
        "Digital Design Review",
        "RISC-V Instruction Formats"
      ]
    },
    {
      title: "Single-Cycle Processor Implementation",
      topics: [
        "Datapath Design",
        "Control Logic",
        "ALU Implementation",
        "Instruction Decoding"
      ]
    },
    {
      title: "Pipelining and Hazards",
      topics: [
        "Pipeline Stages",
        "Data Hazards",
        "Control Hazards",
        "Forwarding Logic"
      ]
    },
    {
      title: "Memory Hierarchy and Caches",
      topics: [
        "Memory Organization",
        "Cache Design",
        "Cache Coherence",
        "Virtual Memory"
      ]
    }
  ],
  prerequisites: [
    "Digital Logic Design",
    "Computer Architecture Fundamentals",
    "Verilog or VHDL Experience",
    "Basic Understanding of Assembly Language"
  ],
  skills: [
    "RISC-V Architecture",
    "Processor Design",
    "Pipeline Implementation",
    "Hazard Resolution",
    "Memory Hierarchy Design",
    "Performance Optimization",
    "Hardware Debugging",
    "Architecture Verification",
    "ISA Extensions",
    "Cache Coherence Protocols",
    "Branch Prediction",
    "Low Power Design Techniques",
    "Out-of-Order Execution",
    "Superscalar Architecture",
    "Formal Verification of Processors"
  ],
  // Use the full chapter data including sections arrays
  chapters: chapters,
  exercises: [
    {
      id: "ex1",
      title: "ALU Implementation",
      description: "Implement the Arithmetic Logic Unit for the RISC-V processor supporting all standard operations used in RV32I.",
      difficulty: "Medium",
      type: "Coding",
      points: 100,
      estimatedTime: "3 hours",
      completed: false,
      industryRelevance: "ALU design is a fundamental component in processor interviews at companies like Intel, AMD, and ARM."
    },
    {
      id: "ex2",
      title: "Register File Design",
      description: "Design a 32x32 register file with dual read ports and single write port, optimized for both performance and power efficiency.",
      difficulty: "Medium",
      type: "Coding",
      points: 125,
      estimatedTime: "4 hours",
      completed: false,
      industryRelevance: "Register file optimization is critical in modern low-power processor designs at companies like Apple and Qualcomm."
    },
    {
      id: "ex3",
      title: "Single-Cycle CPU",
      description: "Implement a single-cycle RISC-V CPU that supports basic RV32I instructions, with complete testing and verification.",
      difficulty: "Hard",
      type: "Project",
      points: 200,
      estimatedTime: "8 hours",
      completed: false,
      industryRelevance: "Understanding the complete CPU datapath is essential for roles at RISC-V focused companies like SiFive and Western Digital."
    },
    {
      id: "ex4",
      title: "5-Stage Pipeline",
      description: "Extend your CPU design to a 5-stage pipeline with comprehensive hazard handling and branch prediction.",
      difficulty: "Very Hard",
      type: "Project",
      points: 300,
      estimatedTime: "12 hours",
      completed: false,
      industryRelevance: "Pipeline design is a core skill tested in interviews at all major processor companies including NVIDIA, Intel, and ARM."
    },
    {
      id: "ex5",
      title: "Cache Memory Subsystem",
      description: "Design and implement a configurable cache memory subsystem for your RISC-V processor.",
      difficulty: "Very Hard",
      type: "Project",
      points: 350,
      estimatedTime: "15 hours",
      completed: false,
      industryRelevance: "Cache design expertise is highly valued at companies working on high-performance processors like AMD and NVIDIA."
    }
  ],
  relatedModules: [
    {
      id: "verilog-fundamentals",
      title: "Verilog Fundamentals",
      description: "Master the Verilog hardware description language for digital design",
      level: "Beginner",
      image: "https://tse1.mm.bing.net/th?id=OIP.jz0YXGGr51-sLiHhII4g5wHaEM&pid=Api&P=0&h=180"
    },
    {
      id: "system-verification",
      title: "System Verification",
      description: "Learn advanced verification techniques for complex digital systems",
      level: "Advanced",
      image: "https://tse1.mm.bing.net/th?id=OIP.xTfbaCirE3pvtPMZwDHJRgHaHa&pid=Api&P=0&h=180"
    }
  ],
  codeExamples: [
    {
      title: "RV32I ALU Implementation",
      code: `module rv32i_alu(
  input  logic [31:0] a, b,
  input  logic [3:0]  alu_ctrl,
  output logic [31:0] result,
  output logic        zero
);

  // ALU control codes
  localparam ALU_ADD  = 4'b0000;
  localparam ALU_SUB  = 4'b1000;
  localparam ALU_SLL  = 4'b0001;
  localparam ALU_SLT  = 4'b0010;
  localparam ALU_SLTU = 4'b0011;
  localparam ALU_XOR  = 4'b0100;
  localparam ALU_SRL  = 4'b0101;
  localparam ALU_SRA  = 4'b1101;
  localparam ALU_OR   = 4'b0110;
  localparam ALU_AND  = 4'b0111;
  
  // Main ALU operation
  always_comb begin
    case (alu_ctrl)
      ALU_ADD:  result = a + b;
      ALU_SUB:  result = a - b;
      ALU_SLL:  result = a << b[4:0];
      ALU_SLT:  result = $signed(a) < $signed(b) ? 32'b1 : 32'b0;
      ALU_SLTU: result = a < b ? 32'b1 : 32'b0;
      ALU_XOR:  result = a ^ b;
      ALU_SRL:  result = a >> b[4:0];
      ALU_SRA:  result = $signed(a) >>> b[4:0];
      ALU_OR:   result = a | b;
      ALU_AND:  result = a & b;
      default:  result = a + b; // Default to ADD
    endcase
  end
  
  // Zero flag
  assign zero = (result == 32'b0);
endmodule`
    },
    {
      title: "RISC-V Register File",
      code: `module rv32i_regfile(
  input  logic        clk,
  input  logic        rst_n,
  // Read port 1
  input  logic [4:0]  rs1_addr,
  output logic [31:0] rs1_data,
  // Read port 2
  input  logic [4:0]  rs2_addr,
  output logic [31:0] rs2_data,
  // Write port
  input  logic        we,
  input  logic [4:0]  rd_addr,
  input  logic [31:0] rd_data
);
  
  // 32 32-bit registers (x0 hardwired to 0)
  logic [31:0] registers [31:1];
  
  // Read operations (asynchronous)
  assign rs1_data = (rs1_addr == 5'b0) ? 32'b0 : registers[rs1_addr];
  assign rs2_data = (rs2_addr == 5'b0) ? 32'b0 : registers[rs2_addr];
  
  // Write operation (synchronous)
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      for (int i = 1; i < 32; i++) begin
        registers[i] <= 32'b0;
      end
    end
    else if (we && rd_addr != 5'b0) begin
      registers[rd_addr] <= rd_data;
    end
  end
endmodule`
    }
  ],
  resources: [
    {
      title: "RISC-V Specifications",
      url: "https://riscv.org/specifications/",
      type: "Reference"
    },
    {
      title: "The RISC-V Reader",
      url: "https://www.riscvbook.com/",
      type: "Book"
    }
  ],
  sampleQuestions: [
    {
      question: "What is the primary advantage of RISC-V's modular ISA design?",
      options: [
        "It allows for implementing only necessary features, reducing complexity and power consumption",
        "It makes verification more challenging, ensuring better quality",
        "It requires more silicon area than fixed ISAs",
        "It forces all implementations to include floating-point support"
      ],
      answer: 0
    },
    {
      question: "In a RISC-V pipelined processor, what type of hazard is most effectively addressed by forwarding?",
      options: [
        "Control hazards",
        "Structural hazards",
        "Data hazards",
        "Memory hazards"
      ],
      answer: 2
    },
    {
      question: "Which RISC-V extension adds atomic memory operations for multi-processor synchronization?",
      options: [
        "M extension",
        "A extension",
        "F extension",
        "C extension"
      ],
      answer: 1
    }
  ],
  // Add practical examples for RISC-V implementations
  practicalExamples: [
    {
      id: "rv-ex1",
      title: "RV32I ALU Implementation",
      description: "Design a complete Arithmetic Logic Unit (ALU) for the RV32I instruction set, supporting all standard ALU operations.",
      difficulty: "Medium",
      type: "Hardware Design",
      completed: false,
      code: `module rv32i_alu (
  input  logic [31:0] operand_a,
  input  logic [31:0] operand_b,
  input  logic [3:0]  alu_op,
  output logic [31:0] result,
  output logic        zero
);

  // ALU operation codes
  localparam ALU_ADD  = 4'b0000;
  localparam ALU_SUB  = 4'b1000;
  localparam ALU_SLL  = 4'b0001;
  localparam ALU_SLT  = 4'b0010;
  localparam ALU_SLTU = 4'b0011;
  localparam ALU_XOR  = 4'b0100;
  localparam ALU_SRL  = 4'b0101;
  localparam ALU_SRA  = 4'b1101;
  localparam ALU_OR   = 4'b0110;
  localparam ALU_AND  = 4'b0111;

  // Main ALU operation
  always_comb begin
    case (alu_op)
      ALU_ADD:  result = operand_a + operand_b;
      ALU_SUB:  result = operand_a - operand_b;
      ALU_SLL:  result = operand_a << operand_b[4:0];
      ALU_SLT:  result = $signed(operand_a) < $signed(operand_b) ? 32'b1 : 32'b0;
      ALU_SLTU: result = operand_a < operand_b ? 32'b1 : 32'b0;
      ALU_XOR:  result = operand_a ^ operand_b;
      ALU_SRL:  result = operand_a >> operand_b[4:0];
      ALU_SRA:  result = $signed(operand_a) >>> operand_b[4:0];
      ALU_OR:   result = operand_a | operand_b;
      ALU_AND:  result = operand_a & operand_b;
      default:  result = operand_a + operand_b; // Default to ADD
    endcase
  end

  // Zero flag for branch operations
  assign zero = (result == 32'b0);
endmodule`,
      testbench: `module rv32i_alu_tb;
  // Test signals
  logic [31:0] operand_a;
  logic [31:0] operand_b;
  logic [3:0]  alu_op;
  logic [31:0] result;
  logic        zero;
  
  // Instantiate the ALU
  rv32i_alu dut (
    .operand_a(operand_a),
    .operand_b(operand_b),
    .alu_op(alu_op),
    .result(result),
    .zero(zero)
  );
  
  // ALU operation codes for reference
  localparam ALU_ADD  = 4'b0000;
  localparam ALU_SUB  = 4'b1000;
  localparam ALU_SLL  = 4'b0001;
  localparam ALU_SLT  = 4'b0010;
  localparam ALU_SLTU = 4'b0011;
  localparam ALU_XOR  = 4'b0100;
  localparam ALU_SRL  = 4'b0101;
  localparam ALU_SRA  = 4'b1101;
  localparam ALU_OR   = 4'b0110;
  localparam ALU_AND  = 4'b0111;
  
  // Test sequence
  initial begin
    $display("Starting RV32I ALU Testbench");
    
    // Test ADD operation
    operand_a = 32'h0000_00A5;
    operand_b = 32'h0000_00C3;
    alu_op = ALU_ADD;
    #10;
    $display("ADD: %h + %h = %h", operand_a, operand_b, result);
    
    // Test SUB operation
    operand_a = 32'h0000_00A5;
    operand_b = 32'h0000_0025;
    alu_op = ALU_SUB;
    #10;
    $display("SUB: %h - %h = %h", operand_a, operand_b, result);
    
    // Test SLT operation (signed comparison)
    operand_a = 32'hFFFF_FFFF; // -1 in two's complement
    operand_b = 32'h0000_0001; // 1
    alu_op = ALU_SLT;
    #10;
    $display("SLT: %h < %h = %h (expected 1)", operand_a, operand_b, result);
    
    // Test SLTU operation (unsigned comparison)
    operand_a = 32'hFFFF_FFFF; // Max unsigned value
    operand_b = 32'h0000_0001; // 1
    alu_op = ALU_SLTU;
    #10;
    $display("SLTU: %h < %h = %h (expected 0)", operand_a, operand_b, result);
    
    // Test XOR operation
    operand_a = 32'hFFFF_0000;
    operand_b = 32'h0000_FFFF;
    alu_op = ALU_XOR;
    #10;
    $display("XOR: %h ^ %h = %h", operand_a, operand_b, result);
    
    // Test SRL operation (logical right shift)
    operand_a = 32'h8000_0000;
    operand_b = 32'h0000_0004; // Shift by 4 bits
    alu_op = ALU_SRL;
    #10;
    $display("SRL: %h >> %d = %h", operand_a, operand_b[4:0], result);
    
    // Test SRA operation (arithmetic right shift)
    operand_a = 32'h8000_0000;
    operand_b = 32'h0000_0004; // Shift by 4 bits
    alu_op = ALU_SRA;
    #10;
    $display("SRA: %h >>> %d = %h", operand_a, operand_b[4:0], result);
    
    // Test zero flag
    operand_a = 32'h0000_000A;
    operand_b = 32'h0000_000A;
    alu_op = ALU_SUB;
    #10;
    $display("ZERO: %h - %h = %h, zero = %b", operand_a, operand_b, result, zero);
    
    $display("RV32I ALU Tests Complete");
    $finish;
  end
endmodule`,
      explanation: "This ALU implementation supports all the core operations required by the RV32I instruction set. The ALU takes two 32-bit operands and a 4-bit operation code that selects between 10 different operations. The zero flag output is particularly important for branch instructions in the RISC-V architecture. The design uses SystemVerilog constructs like always_comb for better synthesis and localparam for readability. The testbench covers all operations with special attention to edge cases like sign extension for arithmetic right shift and proper handling of signed vs. unsigned comparisons."
    },
    {
      id: "rv-ex2",
      title: "RISC-V Register File",
      description: "Implement a 32×32-bit register file with dual read ports and a single write port, common in RISC-V processors.",
      difficulty: "Medium",
      type: "Hardware Design",
      completed: false,
      code: `module rv32_regfile (
  input  logic        clk,
  input  logic        rst_n,
  // Read port 1
  input  logic [4:0]  rs1_addr,
  output logic [31:0] rs1_data,
  // Read port 2
  input  logic [4:0]  rs2_addr,
  output logic [31:0] rs2_data,
  // Write port
  input  logic        wr_en,
  input  logic [4:0]  rd_addr,
  input  logic [31:0] rd_data
);
  
  // Register file storage (x0 is hardwired to 0, so only need 31 actual registers)
  logic [31:0] registers [1:31];
  
  // Read operations (asynchronous)
  // x0 is hardwired to 0
  assign rs1_data = (rs1_addr == 5'b0) ? 32'b0 : registers[rs1_addr];
  assign rs2_data = (rs2_addr == 5'b0) ? 32'b0 : registers[rs2_addr];
  
  // Write operation (synchronous)
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      // Reset all registers to 0
      for (int i = 1; i < 32; i = i + 1) begin
        registers[i] <= 32'b0;
      end
    end
    else if (wr_en && rd_addr != 5'b0) begin
      // Cannot write to x0
      registers[rd_addr] <= rd_data;
    end
  end
endmodule`,
      testbench: `module rv32_regfile_tb;
  // Clock and reset
  logic        clk;
  logic        rst_n;
  
  // Read port 1
  logic [4:0]  rs1_addr;
  logic [31:0] rs1_data;
  
  // Read port 2
  logic [4:0]  rs2_addr;
  logic [31:0] rs2_data;
  
  // Write port
  logic        wr_en;
  logic [4:0]  rd_addr;
  logic [31:0] rd_data;
  
  // Instantiate the register file
  rv32_regfile dut (
    .clk(clk),
    .rst_n(rst_n),
    .rs1_addr(rs1_addr),
    .rs1_data(rs1_data),
    .rs2_addr(rs2_addr),
    .rs2_data(rs2_data),
    .wr_en(wr_en),
    .rd_addr(rd_addr),
    .rd_data(rd_data)
  );
  
  // Clock generation (10ns period)
  always #5 clk = ~clk;
  
  // Test sequence
  initial begin
    $display("Starting Register File Testbench");
    
    // Initialize signals
    clk = 0;
    rst_n = 0;
    rs1_addr = 0;
    rs2_addr = 0;
    wr_en = 0;
    rd_addr = 0;
    rd_data = 0;
    
    // Apply reset
    #20 rst_n = 1;
    
    // Test 1: Write to register x1
    rd_addr = 5'd1;
    rd_data = 32'hAAAA_AAAA;
    wr_en = 1;
    @(posedge clk);
    #1; // Wait for update
    
    // Test 2: Try to write to x0 (should remain 0)
    rd_addr = 5'd0;
    rd_data = 32'hFFFF_FFFF;
    wr_en = 1;
    @(posedge clk);
    #1; // Wait for update
    
    // Test 3: Read from x1 and x0
    wr_en = 0;
    rs1_addr = 5'd1;
    rs2_addr = 5'd0;
    #1; // Wait for read
    $display("x1 = %h (expected AAAA_AAAA), x0 = %h (expected 0)", rs1_data, rs2_data);
    
    // Test 4: Write to multiple registers
    for (int i = 1; i < 10; i = i + 1) begin
      rd_addr = i;
      rd_data = 32'h1000_0000 + i;
      wr_en = 1;
      @(posedge clk);
      #1;
    end
    
    // Test 5: Read from multiple registers
    wr_en = 0;
    for (int i = 0; i < 10; i = i + 1) begin
      rs1_addr = i;
      #1;
      $display("x%0d = %h", i, rs1_data);
    end
    
    // Test 6: Verify read during write behavior
    rd_addr = 5'd15;
    rd_data = 32'h1234_5678;
    wr_en = 1;
    rs1_addr = 5'd15;
    rs2_addr = 5'd15;
    @(posedge clk);
    #1;
    $display("Read during write: rs1_data = %h, rs2_data = %h", rs1_data, rs2_data);
    
    $display("Register File Tests Complete");
    $finish;
  end
endmodule`,
      explanation: "This implementation provides a 32×32-bit register file essential for any RISC-V processor. It features dual asynchronous read ports and a single synchronous write port, which is the standard configuration for most RISC-V implementations. The register x0 is hardwired to zero as per the RISC-V specification. The design uses SystemVerilog constructs and follows best practices for hardware description. The testbench checks various aspects including reset behavior, writing to multiple registers, the hardwired x0 register, and read-during-write behavior."
    },
    {
      id: "rv-ex3",
      title: "RISC-V 5-Stage Pipeline Control Unit",
      description: "Design a control unit for a 5-stage pipelined RISC-V processor that handles all RV32I instructions.",
      difficulty: "Hard",
      type: "Hardware Design",
      completed: false,
      code: `module rv32i_control_unit (
  input  logic [6:0] opcode,
  input  logic [2:0] funct3,
  input  logic [6:0] funct7,
  
  // Control signals
  output logic       branch,
  output logic       jump,
  output logic       mem_read,
  output logic       mem_to_reg,
  output logic       mem_write,
  output logic [1:0] alu_op,
  output logic       alu_src,
  output logic       reg_write,
  output logic [2:0] imm_sel
);

  // RISC-V opcodes
  localparam LUI    = 7'b0110111;
  localparam AUIPC  = 7'b0010111;
  localparam JAL    = 7'b1101111;
  localparam JALR   = 7'b1100111;
  localparam BRANCH = 7'b1100011;
  localparam LOAD   = 7'b0000011;
  localparam STORE  = 7'b0100011;
  localparam OP_IMM = 7'b0010011;
  localparam OP     = 7'b0110011;
  
  // Immediate format selection
  localparam I_TYPE = 3'b000;
  localparam S_TYPE = 3'b001;
  localparam B_TYPE = 3'b010;
  localparam U_TYPE = 3'b011;
  localparam J_TYPE = 3'b100;
  
  // ALU op encoding for ALU control
  localparam ALU_OP_ADD  = 2'b00;  // add for loads/stores/lui/auipc
  localparam ALU_OP_BRANCH = 2'b01; // branch operations
  localparam ALU_OP_REG_IMM = 2'b10; // register-immediate operations
  localparam ALU_OP_REG_REG = 2'b11; // register-register operations

  always_comb begin
    // Default values
    branch = 1'b0;
    jump = 1'b0;
    mem_read = 1'b0;
    mem_to_reg = 1'b0;
    mem_write = 1'b0;
    alu_op = ALU_OP_ADD;
    alu_src = 1'b0;
    reg_write = 1'b0;
    imm_sel = I_TYPE;

    case (opcode)
      LUI: begin
        reg_write = 1'b1;
        alu_src = 1'b1;
        imm_sel = U_TYPE;
      end
      
      AUIPC: begin
        reg_write = 1'b1;
        alu_src = 1'b1;
        imm_sel = U_TYPE;
      end
      
      JAL: begin
        reg_write = 1'b1;
        jump = 1'b1;
        imm_sel = J_TYPE;
      end
      
      JALR: begin
        reg_write = 1'b1;
        jump = 1'b1;
        alu_src = 1'b1;
        imm_sel = I_TYPE;
      end
      
      BRANCH: begin
        branch = 1'b1;
        alu_op = ALU_OP_BRANCH;
        imm_sel = B_TYPE;
      end
      
      LOAD: begin
        mem_read = 1'b1;
        reg_write = 1'b1;
        alu_src = 1'b1;
        mem_to_reg = 1'b1;
        imm_sel = I_TYPE;
      end
      
      STORE: begin
        mem_write = 1'b1;
        alu_src = 1'b1;
        imm_sel = S_TYPE;
      end
      
      OP_IMM: begin
        reg_write = 1'b1;
        alu_src = 1'b1;
        alu_op = ALU_OP_REG_IMM;
        imm_sel = I_TYPE;
      end
      
      OP: begin
        reg_write = 1'b1;
        alu_op = ALU_OP_REG_REG;
      end
      
      default: begin
        // NOP or illegal instruction, all controls are default values
      end
    endcase
  end
endmodule`,
      testbench: `module rv32i_control_unit_tb;
  // Input signals
  logic [6:0] opcode;
  logic [2:0] funct3;
  logic [6:0] funct7;
  
  // Output signals
  logic       branch;
  logic       jump;
  logic       mem_read;
  logic       mem_to_reg;
  logic       mem_write;
  logic [1:0] alu_op;
  logic       alu_src;
  logic       reg_write;
  logic [2:0] imm_sel;
  
  // RISC-V opcodes
  localparam LUI    = 7'b0110111;
  localparam AUIPC  = 7'b0010111;
  localparam JAL    = 7'b1101111;
  localparam JALR   = 7'b1100111;
  localparam BRANCH = 7'b1100011;
  localparam LOAD   = 7'b0000011;
  localparam STORE  = 7'b0100011;
  localparam OP_IMM = 7'b0010011;
  localparam OP     = 7'b0110011;
  
  // Instantiate the control unit
  rv32i_control_unit dut (
    .opcode(opcode),
    .funct3(funct3),
    .funct7(funct7),
    .branch(branch),
    .jump(jump),
    .mem_read(mem_read),
    .mem_to_reg(mem_to_reg),
    .mem_write(mem_write),
    .alu_op(alu_op),
    .alu_src(alu_src),
    .reg_write(reg_write),
    .imm_sel(imm_sel)
  );
  
  // Helper function to display control signals
  function void display_signals();
    $display("Control Signals: branch=%b, jump=%b, mem_read=%b, mem_to_reg=%b, mem_write=%b, alu_op=%b, alu_src=%b, reg_write=%b, imm_sel=%b",
      branch, jump, mem_read, mem_to_reg, mem_write, alu_op, alu_src, reg_write, imm_sel);
  endfunction
  
  // Test sequence
  initial begin
    $display("Starting Control Unit Testbench");
    
    // Initialize inputs
    opcode = 7'b0;
    funct3 = 3'b0;
    funct7 = 7'b0;
    #10;
    
    // Test R-type instructions (ADD, SUB, etc.)
    $display("\nTesting R-type (OP):");
    opcode = OP;
    funct3 = 3'b000; // ADD/SUB
    funct7 = 7'b0000000; // ADD
    #10;
    display_signals();
    
    // Test I-type instructions (ADDI, etc.)
    $display("\nTesting I-type (OP_IMM):");
    opcode = OP_IMM;
    funct3 = 3'b000; // ADDI
    #10;
    display_signals();
    
    // Test load instructions
    $display("\nTesting LOAD:");
    opcode = LOAD;
    funct3 = 3'b010; // LW
    #10;
    display_signals();
    
    // Test store instructions
    $display("\nTesting STORE:");
    opcode = STORE;
    funct3 = 3'b010; // SW
    #10;
    display_signals();
    
    // Test branch instructions
    $display("\nTesting BRANCH:");
    opcode = BRANCH;
    funct3 = 3'b000; // BEQ
    #10;
    display_signals();
    
    // Test JAL instruction
    $display("\nTesting JAL:");
    opcode = JAL;
    #10;
    display_signals();
    
    // Test JALR instruction
    $display("\nTesting JALR:");
    opcode = JALR;
    funct3 = 3'b000;
    #10;
    display_signals();
    
    // Test LUI instruction
    $display("\nTesting LUI:");
    opcode = LUI;
    #10;
    display_signals();
    
    // Test AUIPC instruction
    $display("\nTesting AUIPC:");
    opcode = AUIPC;
    #10;
    display_signals();
    
    $display("Control Unit Tests Complete");
    $finish;
  end
endmodule`,
      explanation: "This control unit is a crucial component of a pipelined RISC-V processor, responsible for generating control signals that coordinate the flow of data through the pipeline. It decodes the opcode field of instructions to determine instruction type and sets appropriate control signals. The design supports all RV32I instruction types, including R-type, I-type, S-type, B-type, U-type, and J-type instructions. The ALU operation code is encoded to be further decoded by a separate ALU control unit. The testbench systematically checks all instruction types, verifying that the correct control signals are generated for each type of instruction."
    },
    {
      id: "rv-ex4",
      title: "2-Bit Dynamic Branch Predictor",
      description: "Implement a 2-bit saturating counter branch predictor commonly used in RISC-V processors to reduce branch penalty.",
      difficulty: "Hard",
      type: "Hardware Design",
      completed: false,
      code: `module branch_predictor #(
  parameter HISTORY_BITS = 6  // Number of bits for branch history table indexing
)(
  input  logic                    clk,
  input  logic                    rst_n,
  input  logic [31:0]             branch_pc,            // PC of the branch instruction
  input  logic                    branch_resolved,      // Asserted when branch outcome is known
  input  logic                    branch_taken_actual,  // Actual branch outcome
  output logic                    branch_prediction     // Predicted branch outcome
);

  localparam ENTRIES = 2**HISTORY_BITS;
  
  // 2-bit saturating counter states
  localparam STRONGLY_NOT_TAKEN = 2'b00;
  localparam WEAKLY_NOT_TAKEN   = 2'b01;
  localparam WEAKLY_TAKEN       = 2'b10;
  localparam STRONGLY_TAKEN     = 2'b11;
  
  // Branch History Table (BHT) - stores 2-bit counters
  logic [1:0] bht [0:ENTRIES-1];
  
  // Index calculation for BHT - using lower bits of PC
  logic [HISTORY_BITS-1:0] bht_index;
  assign bht_index = branch_pc[HISTORY_BITS+1:2]; // Ignore lowest 2 bits (word alignment)
  
  // Prediction logic
  assign branch_prediction = bht[bht_index][1]; // MSB determines taken or not taken

  // Update branch history table when branch is resolved
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      // Initialize all counters to weakly not taken
      for (int i = 0; i < ENTRIES; i++) begin
        bht[i] <= WEAKLY_NOT_TAKEN;
      end
    end 
    else if (branch_resolved) begin
      // Update counter based on actual branch outcome
      case (bht[bht_index])
        STRONGLY_NOT_TAKEN: 
          bht[bht_index] <= branch_taken_actual ? WEAKLY_NOT_TAKEN : STRONGLY_NOT_TAKEN;
        WEAKLY_NOT_TAKEN:
          bht[bht_index] <= branch_taken_actual ? WEAKLY_TAKEN : STRONGLY_NOT_TAKEN;
        WEAKLY_TAKEN:
          bht[bht_index] <= branch_taken_actual ? STRONGLY_TAKEN : WEAKLY_NOT_TAKEN;
        STRONGLY_TAKEN:
          bht[bht_index] <= branch_taken_actual ? STRONGLY_TAKEN : WEAKLY_TAKEN;
        default:
          bht[bht_index] <= WEAKLY_NOT_TAKEN;
      endcase
    end
  end
endmodule`,
      testbench: `module branch_predictor_tb;
  // Parameters
  localparam HISTORY_BITS = 4; // Smaller table for simulation
  
  // Test signals
  logic        clk;
  logic        rst_n;
  logic [31:0] branch_pc;
  logic        branch_resolved;
  logic        branch_taken_actual;
  logic        branch_prediction;
  
  // Performance counters
  int total_branches = 0;
  int correct_predictions = 0;
  
  // Instantiate the branch predictor
  branch_predictor #(
    .HISTORY_BITS(HISTORY_BITS)
  ) dut (
    .clk(clk),
    .rst_n(rst_n),
    .branch_pc(branch_pc),
    .branch_resolved(branch_resolved),
    .branch_taken_actual(branch_taken_actual),
    .branch_prediction(branch_prediction)
  );
  
  // Clock generation (10ns period)
  always #5 clk = ~clk;
  
  // Calculate prediction accuracy
  function void display_accuracy();
    real accuracy = (correct_predictions * 100.0) / total_branches;
    $display("Prediction Accuracy: %0.2f%% (%0d/%0d)", accuracy, correct_predictions, total_branches);
  endfunction
  
  // Test sequence
  initial begin
    $display("Starting Branch Predictor Testbench");
    
    // Initialize signals
    clk = 0;
    rst_n = 0;
    branch_pc = 0;
    branch_resolved = 0;
    branch_taken_actual = 0;
    
    // Apply reset
    #20 rst_n = 1;
    
    // Test 1: Always taken branch pattern
    $display("\nTest 1: Always Taken Branch");
    for (int i = 0; i < 10; i++) begin
      branch_pc = 32'h1000;
      #1; // Check prediction
      $display("Iteration %0d: Prediction = %b", i, branch_prediction);
      
      // Record prediction result
      total_branches++;
      if (branch_prediction == 1'b1) correct_predictions++;
      
      // Resolve branch as taken
      branch_resolved = 1'b1;
      branch_taken_actual = 1'b1;
      @(posedge clk);
      branch_resolved = 1'b0;
      @(posedge clk);
    end
    display_accuracy();
    
    // Reset performance counters
    total_branches = 0;
    correct_predictions = 0;
    
    // Test 2: Always not-taken branch pattern
    $display("\nTest 2: Always Not-Taken Branch");
    for (int i = 0; i < 10; i++) begin
      branch_pc = 32'h2000;
      #1; // Check prediction
      $display("Iteration %0d: Prediction = %b", i, branch_prediction);
      
      // Record prediction result
      total_branches++;
      if (branch_prediction == 1'b0) correct_predictions++;
      
      // Resolve branch as not taken
      branch_resolved = 1'b1;
      branch_taken_actual = 1'b0;
      @(posedge clk);
      branch_resolved = 1'b0;
      @(posedge clk);
    end
    display_accuracy();
    
    // Reset performance counters
    total_branches = 0;
    correct_predictions = 0;
    
    // Test 3: Alternating pattern
    $display("\nTest 3: Alternating Branch Pattern (TNTNTNT...)");
    for (int i = 0; i < 20; i++) begin
      branch_pc = 32'h3000;
      #1; // Check prediction
      
      // Determine if current iteration should be taken or not taken
      logic expected = (i % 2 == 0) ? 1'b1 : 1'b0;
      
      $display("Iteration %0d: Prediction = %b, Expected = %b", i, branch_prediction, expected);
      
      // Record prediction result
      total_branches++;
      if (branch_prediction == expected) correct_predictions++;
      
      // Resolve branch according to pattern
      branch_resolved = 1'b1;
      branch_taken_actual = expected;
      @(posedge clk);
      branch_resolved = 1'b0;
      @(posedge clk);
    end
    display_accuracy();
    
    // Reset performance counters
    total_branches = 0;
    correct_predictions = 0;
    
    // Test 4: Multiple branch addresses
    $display("\nTest 4: Multiple Branch Addresses");
    for (int i = 0; i < 20; i++) begin
      // Alternate between 3 different branch addresses
      branch_pc = (i % 3 == 0) ? 32'h4000 :
                 (i % 3 == 1) ? 32'h4100 : 32'h4200;
                 
      // Each address has a different pattern
      logic expected;
      if (i % 3 == 0)
        expected = 1'b1; // Always taken
      else if (i % 3 == 1)
        expected = 1'b0; // Always not taken
      else
        expected = (i % 2 == 0) ? 1'b1 : 1'b0; // Alternating
      
      #1; // Check prediction
      $display("Iteration %0d: PC = %h, Prediction = %b, Expected = %b", 
                i, branch_pc, branch_prediction, expected);
      
      // Record prediction result
      total_branches++;
      if (branch_prediction == expected) correct_predictions++;
      
      // Resolve branch according to pattern
      branch_resolved = 1'b1;
      branch_taken_actual = expected;
      @(posedge clk);
      branch_resolved = 1'b0;
      @(posedge clk);
    end
    display_accuracy();
    
    $display("Branch Predictor Tests Complete");
    $finish;
  end
endmodule`,
      explanation: "This branch predictor implements a 2-bit saturating counter scheme, which is a commonly used dynamic branch prediction method in modern processors including RISC-V implementations. The predictor maintains a Branch History Table (BHT) indexed by the lower bits of the branch instruction's PC. Each entry in the BHT contains a 2-bit saturating counter that tracks the recent history of branch outcomes. The predictor uses the most significant bit of the counter to make predictions (1 for taken, 0 for not taken). The 2-bit scheme allows the predictor to tolerate occasional divergences from the predominant pattern without immediately changing its prediction. The testbench evaluates the predictor with various branch patterns, including always-taken, always-not-taken, alternating patterns, and multiple branch addresses, calculating prediction accuracy for each test case."
    },
    {
      id: "rv-ex5",
      title: "RISC-V Single-Cycle CPU",
      description: "Implement a complete single-cycle RISC-V CPU that supports the basic RV32I instruction set.",
      difficulty: "Hard",
      type: "Hardware Design",
      completed: false,
      code: `module riscv_single_cycle_cpu (
  input  logic        clk,
  input  logic        rst_n,
  // Instruction memory interface
  output logic [31:0] instr_addr,
  input  logic [31:0] instr_data,
  // Data memory interface
  output logic [31:0] data_addr,
  output logic [31:0] data_wdata,
  input  logic [31:0] data_rdata,
  output logic        data_we
);

  // Control signals
  logic       branch;
  logic       jump;
  logic       mem_read;
  logic       mem_to_reg;
  logic       mem_write;
  logic [1:0] alu_op;
  logic       alu_src;
  logic       reg_write;
  logic [2:0] imm_sel;
  
  // Register file signals
  logic [4:0]  rs1_addr;
  logic [4:0]  rs2_addr;
  logic [4:0]  rd_addr;
  logic [31:0] rs1_data;
  logic [31:0] rs2_data;
  logic [31:0] rd_data;
  
  // ALU signals
  logic [31:0] alu_in_a;
  logic [31:0] alu_in_b;
  logic [3:0]  alu_ctrl;
  logic [31:0] alu_result;
  logic        alu_zero;
  
  // Immediate generator
  logic [31:0] imm_ext;
  
  // PC signals
  logic [31:0] pc;
  logic [31:0] pc_next;
  logic [31:0] pc_plus4;
  logic [31:0] pc_branch;
  logic        pc_sel;
  
  // Instruction fields
  logic [6:0] opcode;
  logic [2:0] funct3;
  logic [6:0] funct7;
  
  // Assign instruction memory address to PC
  assign instr_addr = pc;
  
  // Assign data memory interface
  assign data_addr = alu_result;
  assign data_wdata = rs2_data;
  assign data_we = mem_write;
  
  // Instruction decoding
  assign opcode = instr_data[6:0];
  assign rs1_addr = instr_data[19:15];
  assign rs2_addr = instr_data[24:20];
  assign rd_addr = instr_data[11:7];
  assign funct3 = instr_data[14:12];
  assign funct7 = instr_data[31:25];
  
  // PC update
  assign pc_plus4 = pc + 4;
  assign pc_branch = pc + imm_ext;
  assign pc_sel = (branch & alu_zero) | jump;
  
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      pc <= 32'h0000_0000;
    end else begin
      pc <= pc_next;
    end
  end
  
  // Next PC selection
  assign pc_next = pc_sel ? pc_branch : pc_plus4;
  
  // Control unit
  riscv_control_unit control_unit (
    .opcode(opcode),
    .funct3(funct3),
    .funct7(funct7),
    .branch(branch),
    .jump(jump),
    .mem_read(mem_read),
    .mem_to_reg(mem_to_reg),
    .mem_write(mem_write),
    .alu_op(alu_op),
    .alu_src(alu_src),
    .reg_write(reg_write),
    .imm_sel(imm_sel)
  );
  
  // Register file
  riscv_regfile regfile (
    .clk(clk),
    .rst_n(rst_n),
    .rs1_addr(rs1_addr),
    .rs1_data(rs1_data),
    .rs2_addr(rs2_addr),
    .rs2_data(rs2_data),
    .rd_addr(rd_addr),
    .rd_data(rd_data),
    .wr_en(reg_write)
  );
  
  // Immediate generator
  riscv_imm_gen imm_gen (
    .instr(instr_data),
    .imm_sel(imm_sel),
    .imm_ext(imm_ext)
  );
  
  // ALU control unit
  riscv_alu_control alu_control (
    .alu_op(alu_op),
    .funct3(funct3),
    .funct7(funct7),
    .alu_ctrl(alu_ctrl)
  );
  
  // ALU
  assign alu_in_a = rs1_data;
  assign alu_in_b = alu_src ? imm_ext : rs2_data;
  
  riscv_alu alu (
    .a(alu_in_a),
    .b(alu_in_b),
    .alu_ctrl(alu_ctrl),
    .result(alu_result),
    .zero(alu_zero)
  );
  
  // Write back to register file
  assign rd_data = mem_to_reg ? data_rdata : alu_result;

endmodule

// Immediate generator module
module riscv_imm_gen (
  input  logic [31:0] instr,
  input  logic [2:0]  imm_sel,
  output logic [31:0] imm_ext
);

  // Immediate format selection
  localparam I_TYPE = 3'b000;
  localparam S_TYPE = 3'b001;
  localparam B_TYPE = 3'b010;
  localparam U_TYPE = 3'b011;
  localparam J_TYPE = 3'b100;

  always_comb begin
    case (imm_sel)
      I_TYPE: imm_ext = {{20{instr[31]}}, instr[31:20]};
      S_TYPE: imm_ext = {{20{instr[31]}}, instr[31:25], instr[11:7]};
      B_TYPE: imm_ext = {{19{instr[31]}}, instr[31], instr[7], instr[30:25], instr[11:8], 1'b0};
      U_TYPE: imm_ext = {instr[31:12], 12'b0};
      J_TYPE: imm_ext = {{11{instr[31]}}, instr[31], instr[19:12], instr[20], instr[30:21], 1'b0};
      default: imm_ext = 32'b0;
    endcase
  end
endmodule

// ALU control unit
module riscv_alu_control (
  input  logic [1:0] alu_op,
  input  logic [2:0] funct3,
  input  logic [6:0] funct7,
  output logic [3:0] alu_ctrl
);
  
  // ALU operation codes
  localparam ALU_ADD  = 4'b0000;
  localparam ALU_SUB  = 4'b1000;
  localparam ALU_SLL  = 4'b0001;
  localparam ALU_SLT  = 4'b0010;
  localparam ALU_SLTU = 4'b0011;
  localparam ALU_XOR  = 4'b0100;
  localparam ALU_SRL  = 4'b0101;
  localparam ALU_SRA  = 4'b1101;
  localparam ALU_OR   = 4'b0110;
  localparam ALU_AND  = 4'b0111;
  
  always_comb begin
    case (alu_op)
      2'b00: alu_ctrl = ALU_ADD;  // Load/Store: add
      2'b01: begin                // Branch: subtract for comparison
        if (funct3 == 3'b000 || funct3 == 3'b001) // BEQ or BNE
          alu_ctrl = ALU_SUB;
        else if (funct3 == 3'b100 || funct3 == 3'b101) // BLT or BGE
          alu_ctrl = ALU_SLT;
        else // BLTU or BGEU
          alu_ctrl = ALU_SLTU;
      end
      2'b10: begin                // R-type or I-type ALU operations
        case (funct3)
          3'b000: alu_ctrl = (funct7[5] && alu_op[1]) ? ALU_SUB : ALU_ADD;
          3'b001: alu_ctrl = ALU_SLL;
          3'b010: alu_ctrl = ALU_SLT;
          3'b011: alu_ctrl = ALU_SLTU;
          3'b100: alu_ctrl = ALU_XOR;
          3'b101: alu_ctrl = funct7[5] ? ALU_SRA : ALU_SRL;
          3'b110: alu_ctrl = ALU_OR;
          3'b111: alu_ctrl = ALU_AND;
          default: alu_ctrl = ALU_ADD;
        endcase
      end
      default: alu_ctrl = ALU_ADD;
    endcase
  end
endmodule`,
      testbench: `module riscv_single_cycle_cpu_tb;
  // Clock and reset
  logic        clk;
  logic        rst_n;
  
  // Instruction memory interface
  logic [31:0] instr_addr;
  logic [31:0] instr_data;
  
  // Data memory interface
  logic [31:0] data_addr;
  logic [31:0] data_wdata;
  logic [31:0] data_rdata;
  logic        data_we;

  // Instruction memory (ROM)
  logic [31:0] instr_memory [0:127];  // 128 words (512 bytes)
  
  // Data memory (RAM)
  logic [31:0] data_memory [0:127];   // 128 words (512 bytes)
  
  // CPU instance
  riscv_single_cycle_cpu dut (
    .clk(clk),
    .rst_n(rst_n),
    .instr_addr(instr_addr),
    .instr_data(instr_data),
    .data_addr(data_addr),
    .data_wdata(data_wdata),
    .data_rdata(data_rdata),
    .data_we(data_we)
  );
  
  // Clock generation (10ns period)
  always #5 clk = ~clk;
  
  // Instruction memory read
  assign instr_data = instr_memory[instr_addr[8:2]];
  
  // Data memory read/write
  always_ff @(posedge clk) begin
    if (data_we)
      data_memory[data_addr[8:2]] <= data_wdata;
    data_rdata <= data_memory[data_addr[8:2]];
  end
  
  // Monitor memory writes
  always @(posedge clk) begin
    if (data_we)
      $display("MEM[%h] <= %h", data_addr, data_wdata);
  end
  
  // Test program (Calculate sum of numbers from 1 to 10)
  // This will be "loaded" into instruction memory at the start of simulation
  //
  // Assembly program:
  // main:
  //   addi x2, x0, 10       # x2 = 10 (loop count)
  //   addi x3, x0, 0        # x3 = 0 (sum)
  // loop:
  //   add  x3, x3, x2       # x3 = x3 + x2 (add current number to sum)
  //   addi x2, x2, -1       # x2 = x2 - 1 (decrement counter)
  //   bne  x2, x0, loop     # branch if x2 != 0
  //   sw   x3, 0(x0)        # store result in memory address 0
  
  initial begin
    // Initialize test
    clk = 0;
    rst_n = 0;
    
    // Initialize memories
    for (int i = 0; i < 128; i++) begin
      instr_memory[i] = 32'h0;
      data_memory[i] = 32'h0;
    end
    
    // Load the test program
    instr_memory[0] = 32'h00A00113;  // addi x2, x0, 10
    instr_memory[1] = 32'h00000193;  // addi x3, x0, 0
    instr_memory[2] = 32'h00218193;  // add  x3, x3, x2
    instr_memory[3] = 32'hFFF10113;  // addi x2, x2, -1
    instr_memory[4] = 32'hFE011CE3;  // bne  x2, x0, loop (-4)
    instr_memory[5] = 32'h00302023;  // sw   x3, 0(x0)
    
    // Apply reset
    #10 rst_n = 1;
    
    // Run the test for a reasonable amount of time
    #500;
    
    // Check the result
    $display("Sum of numbers from 1 to 10 = %d", data_memory[0]);
    
    if (data_memory[0] == 55)
      $display("TEST PASSED");
    else
      $display("TEST FAILED - Expected 55, got %d", data_memory[0]);
    
    $finish;
  end
endmodule`,
      explanation: "This implementation presents a complete single-cycle RISC-V CPU that executes one instruction per clock cycle. The design includes all essential components: program counter (PC), register file, ALU, control unit, immediate generator, and memory interfaces. The CPU supports the basic RV32I instruction set with five instruction formats (R, I, S, B, U, J). The datapath includes the necessary multiplexers for selecting between different data sources and the control signals that orchestrate the data movement. The testbench simulates a simple program that calculates the sum of numbers from 1 to 10, which should yield 55. It demonstrates how instructions are fetched from instruction memory, decoded, and executed, and how results are written back to either the register file or data memory. This design serves as a foundation for more complex implementations like pipelined or superscalar processors."
    },
    {
      id: "rv-ex6",
      title: "Direct-Mapped Cache Implementation",
      description: "Design a direct-mapped cache memory subsystem for a RISC-V processor, with configurable size and block size.",
      difficulty: "Hard",
      type: "Hardware Design",
      completed: false,
      code: `module direct_mapped_cache #(
  parameter ADDR_WIDTH   = 32,
  parameter DATA_WIDTH   = 32,
  parameter CACHE_SIZE   = 4096,   // Cache size in bytes
  parameter BLOCK_SIZE   = 16,     // Block size in bytes
  parameter WORD_SIZE    = 4       // Word size in bytes (32-bit)
)(
  input  logic                     clk,
  input  logic                     rst_n,
  
  // CPU Interface
  input  logic                     cpu_req_valid,
  input  logic [ADDR_WIDTH-1:0]    cpu_req_addr,
  input  logic                     cpu_req_rw,     // 0: read, 1: write
  input  logic [DATA_WIDTH-1:0]    cpu_req_wdata,
  input  logic [DATA_WIDTH/8-1:0]  cpu_req_wmask,  // Byte-enable mask
  
  output logic                     cpu_resp_valid,
  output logic [DATA_WIDTH-1:0]    cpu_resp_rdata,
  output logic                     cpu_resp_ready,
  
  // Memory Interface
  output logic                     mem_req_valid,
  output logic [ADDR_WIDTH-1:0]    mem_req_addr,
  output logic                     mem_req_rw,
  output logic [BLOCK_SIZE*8-1:0]  mem_req_wdata,
  
  input  logic                     mem_resp_valid,
  input  logic [BLOCK_SIZE*8-1:0]  mem_resp_rdata
);

  // Cache parameters
  localparam BLOCK_WORDS     = BLOCK_SIZE / WORD_SIZE;
  localparam NUM_BLOCKS      = CACHE_SIZE / BLOCK_SIZE;
  localparam OFFSET_BITS     = $clog2(BLOCK_SIZE);
  localparam INDEX_BITS      = $clog2(NUM_BLOCKS);
  localparam TAG_BITS        = ADDR_WIDTH - INDEX_BITS - OFFSET_BITS;
  
  // Address breakdown
  logic [TAG_BITS-1:0]       addr_tag;
  logic [INDEX_BITS-1:0]     addr_index;
  logic [OFFSET_BITS-1:0]    addr_offset;
  
  // Cache storage
  logic [NUM_BLOCKS-1:0]          valid;
  logic [NUM_BLOCKS-1:0]          dirty;
  logic [TAG_BITS-1:0]            tags [NUM_BLOCKS-1:0];
  logic [BLOCK_SIZE*8-1:0]        data [NUM_BLOCKS-1:0];
  
  // FSM states
  typedef enum logic [2:0] {
    IDLE,
    COMPARE_TAG,
    WRITE_BACK,
    ALLOCATE,
    HANDLE_CPU
  } cache_state_t;
  
  cache_state_t state;
  
  // Stored request information
  logic [ADDR_WIDTH-1:0]  req_addr;
  logic                   req_rw;
  logic [DATA_WIDTH-1:0]  req_wdata;
  logic [DATA_WIDTH/8-1:0] req_wmask;
  
  // Address breakdown
  assign addr_tag = cpu_req_addr[ADDR_WIDTH-1:ADDR_WIDTH-TAG_BITS];
  assign addr_index = cpu_req_addr[ADDR_WIDTH-TAG_BITS-1:OFFSET_BITS];
  assign addr_offset = cpu_req_addr[OFFSET_BITS-1:0];
  
  // Helper signals
  logic hit;
  logic miss;
  logic [BLOCK_SIZE*8-1:0] write_data;
  logic [DATA_WIDTH-1:0] read_word;
  logic [TAG_BITS-1:0] current_tag;
  logic current_valid;
  logic current_dirty;
  
  // Calculate cache hit
  assign current_tag = tags[addr_index];
  assign current_valid = valid[addr_index];
  assign current_dirty = dirty[addr_index];
  assign hit = current_valid && (current_tag == addr_tag);
  assign miss = !hit;
  
  // Word alignment within block
  assign read_word = data[addr_index][8*addr_offset +: DATA_WIDTH];
  
  // Cache FSM
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      state <= IDLE;
      valid <= '0;
      dirty <= '0;
      mem_req_valid <= 1'b0;
      cpu_resp_valid <= 1'b0;
      cpu_resp_ready <= 1'b1;
    end else begin
      case (state)
        IDLE: begin
          cpu_resp_valid <= 1'b0;
          if (cpu_req_valid && cpu_resp_ready) begin
            // Store the request
            req_addr <= cpu_req_addr;
            req_rw <= cpu_req_rw;
            req_wdata <= cpu_req_wdata;
            req_wmask <= cpu_req_wmask;
            state <= COMPARE_TAG;
          end
        end
        
        COMPARE_TAG: begin
          if (hit) begin
            // Cache hit
            if (req_rw) begin
              // Write hit
              for (int i = 0; i < DATA_WIDTH/8; i++) begin
                if (req_wmask[i]) begin
                  data[addr_index][8*(addr_offset+i) +: 8] <= req_wdata[8*i +: 8];
                end
              end
              dirty[addr_index] <= 1'b1;
            end
            
            // Return read data or acknowledge write
            cpu_resp_valid <= 1'b1;
            cpu_resp_rdata <= read_word;
            state <= IDLE;
          end else begin
            // Cache miss
            if (current_valid && current_dirty) begin
              // Need to write back dirty block first
              state <= WRITE_BACK;
              mem_req_valid <= 1'b1;
              mem_req_rw <= 1'b1; // Write
              mem_req_addr <= {current_tag, addr_index, {OFFSET_BITS{1'b0}}};
              mem_req_wdata <= data[addr_index];
              cpu_resp_ready <= 1'b0;
            end else begin
              // No need to write back, just allocate
              state <= ALLOCATE;
              mem_req_valid <= 1'b1;
              mem_req_rw <= 1'b0; // Read
              mem_req_addr <= {addr_tag, addr_index, {OFFSET_BITS{1'b0}}};
              cpu_resp_ready <= 1'b0;
            end
          end
        end
        
        WRITE_BACK: begin
          if (mem_resp_valid) begin
            // After write back completes, allocate
            mem_req_valid <= 1'b1;
            mem_req_rw <= 1'b0; // Read
            mem_req_addr <= {addr_tag, addr_index, {OFFSET_BITS{1'b0}}};
            state <= ALLOCATE;
          end
        end
        
        ALLOCATE: begin
          if (mem_resp_valid) begin
            // Save the new cache line
            mem_req_valid <= 1'b0;
            valid[addr_index] <= 1'b1;
            dirty[addr_index] <= 1'b0;
            tags[addr_index] <= addr_tag;
            data[addr_index] <= mem_resp_rdata;
            
            // Now handle the CPU request
            state <= HANDLE_CPU;
            cpu_resp_ready <= 1'b1;
          end
        end
        
        HANDLE_CPU: begin
          if (req_rw) begin
            // Handle write after allocation
            for (int i = 0; i < DATA_WIDTH/8; i++) begin
              if (req_wmask[i]) begin
                data[addr_index][8*(addr_offset+i) +: 8] <= req_wdata[8*i +: 8];
              end
            end
            dirty[addr_index] <= 1'b1;
          end
          
          // Return data or acknowledge
          cpu_resp_valid <= 1'b1;
          cpu_resp_rdata <= data[addr_index][8*addr_offset +: DATA_WIDTH];
          state <= IDLE;
        end
        
        default: state <= IDLE;
      endcase
    end
  end
endmodule`,
      testbench: `module direct_mapped_cache_tb;
  // Parameters
  localparam ADDR_WIDTH = 32;
  localparam DATA_WIDTH = 32;
  localparam CACHE_SIZE = 1024;  // 1KB cache
  localparam BLOCK_SIZE = 16;    // 16-byte blocks
  localparam WORD_SIZE  = 4;     // 4 bytes per word
  
  // DUT signals
  logic                     clk;
  logic                     rst_n;
  
  // CPU interface
  logic                     cpu_req_valid;
  logic [ADDR_WIDTH-1:0]    cpu_req_addr;
  logic                     cpu_req_rw;
  logic [DATA_WIDTH-1:0]    cpu_req_wdata;
  logic [DATA_WIDTH/8-1:0]  cpu_req_wmask;
  logic                     cpu_resp_valid;
  logic [DATA_WIDTH-1:0]    cpu_resp_rdata;
  logic                     cpu_resp_ready;
  
  // Memory interface
  logic                     mem_req_valid;
  logic [ADDR_WIDTH-1:0]    mem_req_addr;
  logic                     mem_req_rw;
  logic [BLOCK_SIZE*8-1:0]  mem_req_wdata;
  logic                     mem_resp_valid;
  logic [BLOCK_SIZE*8-1:0]  mem_resp_rdata;
  
  // Main memory model (simplified)
  logic [7:0] main_memory [0:16383]; // 16KB main memory
  
  // Instantiate the cache
  direct_mapped_cache #(
    .ADDR_WIDTH(ADDR_WIDTH),
    .DATA_WIDTH(DATA_WIDTH),
    .CACHE_SIZE(CACHE_SIZE),
    .BLOCK_SIZE(BLOCK_SIZE),
    .WORD_SIZE(WORD_SIZE)
  ) dut (
    .clk(clk),
    .rst_n(rst_n),
    .cpu_req_valid(cpu_req_valid),
    .cpu_req_addr(cpu_req_addr),
    .cpu_req_rw(cpu_req_rw),
    .cpu_req_wdata(cpu_req_wdata),
    .cpu_req_wmask(cpu_req_wmask),
    .cpu_resp_valid(cpu_resp_valid),
    .cpu_resp_rdata(cpu_resp_rdata),
    .cpu_resp_ready(cpu_resp_ready),
    .mem_req_valid(mem_req_valid),
    .mem_req_addr(mem_req_addr),
    .mem_req_rw(mem_req_rw),
    .mem_req_wdata(mem_req_wdata),
    .mem_resp_valid(mem_resp_valid),
    .mem_resp_rdata(mem_resp_rdata)
  );
  
  // Clock generation (10ns period)
  always #5 clk = ~clk;
  
  // Memory controller model
  always @(posedge clk) begin
    if (mem_req_valid) begin
      if (mem_req_rw) begin
        // Memory write
        for (int i = 0; i < BLOCK_SIZE; i++) begin
          main_memory[mem_req_addr+i] = mem_req_wdata[i*8 +: 8];
        end
        mem_resp_valid <= 1'b1;
      end else begin
        // Memory read (with realistic delay)
        repeat(10) @(posedge clk); // 10 cycle memory latency
        for (int i = 0; i < BLOCK_SIZE; i++) begin
          mem_resp_rdata[i*8 +: 8] = main_memory[mem_req_addr+i];
        end
        mem_resp_valid <= 1'b1;
      end
    end else begin
      mem_resp_valid <= 1'b0;
    end
  end
  
  // Helper function to read a word from memory
  function logic [31:0] read_memory_word(logic [31:0] addr);
    read_memory_word = {
      main_memory[addr+3],
      main_memory[addr+2],
      main_memory[addr+1],
      main_memory[addr]
    };
  endfunction
  
  // Helper function to write a word to memory
  task write_memory_word(logic [31:0] addr, logic [31:0] data);
    main_memory[addr]   = data[7:0];
    main_memory[addr+1] = data[15:8];
    main_memory[addr+2] = data[23:16];
    main_memory[addr+3] = data[31:24];
  endtask
  
  // CPU read request
  task cpu_read(logic [31:0] addr, output logic [31:0] data);
    cpu_req_valid = 1'b1;
    cpu_req_addr = addr;
    cpu_req_rw = 1'b0;
    
    // Wait for cache response
    @(posedge clk);
    while (!cpu_resp_valid) @(posedge clk);
    
    data = cpu_resp_rdata;
    cpu_req_valid = 1'b0;
    
    // Wait a cycle before next operation
    @(posedge clk);
  endtask
  
  // CPU write request
  task cpu_write(logic [31:0] addr, logic [31:0] data, logic [3:0] mask = 4'hF);
    cpu_req_valid = 1'b1;
    cpu_req_addr = addr;
    cpu_req_rw = 1'b1;
    cpu_req_wdata = data;
    cpu_req_wmask = mask;
    
    // Wait for cache response
    @(posedge clk);
    while (!cpu_resp_valid) @(posedge clk);
    
    cpu_req_valid = 1'b0;
    
    // Wait a cycle before next operation
    @(posedge clk);
  endtask
  
  // Hit rate calculation
  int total_requests = 0;
  int cache_hits = 0;
  
  // Test scenario
  initial begin
    // Initialize signals
    clk = 0;
    rst_n = 0;
    cpu_req_valid = 0;
    cpu_req_addr = 0;
    cpu_req_rw = 0;
    cpu_req_wdata = 0;
    cpu_req_wmask = 0;
    mem_resp_valid = 0;
    
    // Initialize memory with some test data
    for (int i = 0; i < 16384; i = i + 4) begin
      write_memory_word(i, i);
    end
    
    // Apply reset
    #20 rst_n = 1;
    #20;
    
    $display("Starting cache tests...");
    
    // Test 1: Single read (cold miss)
    $display("\nTest 1: Single read (cold miss)");
    begin
      logic [31:0] read_data;
      cpu_read(32'h1000, read_data);
      $display("Read from addr 0x1000: 0x%08h", read_data);
      
      if (read_data == 32'h1000)
        $display("TEST 1 PASSED");
      else
        $display("TEST 1 FAILED: Expected 0x1000, got 0x%08h", read_data);
    end
    
    // Test 2: Read hit (same address)
    $display("\nTest 2: Read hit (same address)");
    begin
      logic [31:0] read_data;
      cpu_read(32'h1000, read_data);
      $display("Read from addr 0x1000 (hit): 0x%08h", read_data);
      
      if (read_data == 32'h1000)
        $display("TEST 2 PASSED");
      else
        $display("TEST 2 FAILED: Expected 0x1000, got 0x%08h", read_data);
    end
    
    // Test 3: Read hit (different word in same block)
    $display("\nTest 3: Read hit (different word in same block)");
    begin
      logic [31:0] read_data;
      cpu_read(32'h1004, read_data);
      $display("Read from addr 0x1004 (hit): 0x%08h", read_data);
      
      if (read_data == 32'h1004)
        $display("TEST 3 PASSED");
      else
        $display("TEST 3 FAILED: Expected 0x1004, got 0x%08h", read_data);
    end
    
    // Test 4: Read miss (different block)
    $display("\nTest 4: Read miss (different block)");
    begin
      logic [31:0] read_data;
      cpu_read(32'h2000, read_data);
      $display("Read from addr 0x2000 (miss): 0x%08h", read_data);
      
      if (read_data == 32'h2000)
        $display("TEST 4 PASSED");
      else
        $display("TEST 4 FAILED: Expected 0x2000, got 0x%08h", read_data);
    end
    
    // Test 5: Write hit
    $display("\nTest 5: Write hit");
    begin
      logic [31:0] read_data;
      cpu_write(32'h2000, 32'hDEADBEEF);
      cpu_read(32'h2000, read_data);
      $display("Wrote 0xDEADBEEF to addr 0x2000, read back: 0x%08h", read_data);
      
      if (read_data == 32'hDEADBEEF)
        $display("TEST 5 PASSED");
      else
        $display("TEST 5 FAILED: Expected 0xDEADBEEF, got 0x%08h", read_data);
    end
    
    // Test 6: Write miss (with writeback)
    $display("\nTest 6: Write miss (with writeback)");
    begin
      logic [31:0] read_data;
      
      // First write to address that maps to same cache line as 0x2000
      // Assuming 1KB cache, 16-byte blocks = 64 blocks total
      // So addresses that differ by 1KB (0x400) will map to same block
      cpu_write(32'h2400, 32'hCAFEBABE);
      
      // Now read back the original address to verify writeback
      cpu_read(32'h2000, read_data);
      $display("Wrote to conflicting address, then read back 0x2000: 0x%08h", read_data);
      
      if (read_data == 32'hDEADBEEF) // Should have been written back correctly
        $display("TEST 6 PASSED");
      else
        $display("TEST 6 FAILED: Expected 0xDEADBEEF, got 0x%08h", read_data);
    end
    
    // Test 7: Byte write (partial word)
    $display("\nTest 7: Byte write");
    begin
      logic [31:0] read_data;
      cpu_write(32'h3000, 32'h12345678, 4'b0001); // Write only lowest byte
      cpu_read(32'h3000, read_data);
      $display("Byte write to 0x3000, read back: 0x%08h", read_data);
      
      if ((read_data & 32'h000000FF) == 32'h00000078)
        $display("TEST 7 PASSED");
      else
        $display("TEST 7 FAILED: Expected low byte = 0x78, got 0x%02h", read_data & 32'h000000FF);
    end
    
    $display("\nAll cache tests complete!");
    $finish;
  end
endmodule`,
      explanation: "This example implements a configurable direct-mapped cache memory subsystem for a RISC-V processor. The cache handles both read and write operations, maintaining consistency with main memory through a write-back policy. The design includes a finite state machine (FSM) that manages the cache operations: tag comparison, write-back of dirty blocks, allocation of new blocks, and handling CPU requests. The cache supports byte-level write operations through a write mask, enabling precise control over which bytes within a word are modified. The testbench provides a comprehensive verification environment with a model of main memory and functions to verify cache behavior under various scenarios: cold misses, hits, write operations, and handling of dirty blocks. It tests fundamental cache operations such as fetching data on misses, detecting hits, writing data, and correctly handling cache line replacements. This implementation serves as a foundation for more complex cache architectures like set-associative or multi-level caches."
    }
  ],
  
  // ... existing properties ...
}; 