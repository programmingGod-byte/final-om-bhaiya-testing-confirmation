const chapter16 = {
  id: 16,
  title: "Practical Labs and Projects",
  description: "Hands-on implementation projects for RISC-V processor design",
  estimatedTime: "8 hours",
  completed: false,
  sections: [
    {
      id: "16.1",
      title: "Single-Cycle Core Implementation",
      content: `
        <h3>Building a Basic RISC-V Processor</h3>
        <p>This lab guides you through implementing a functional RV32I single-cycle processor core from scratch.</p>
        
        <h4>RV32I Core Implementation in Verilog/VHDL</h4>
        <p>The implementation process follows these steps:</p>
        <ul>
          <li><strong>Project Setup</strong>: Creating the file structure and testing infrastructure</li>
          <li><strong>Implementation Scope</strong>: Starting with a subset of RV32I instructions</li>
          <li><strong>Module Hierarchy</strong>: Designing the top-level module and its subcomponents</li>
          <li><strong>Building Incrementally</strong>: Testing each component before integration</li>
          <li><strong>Step-by-step Verification</strong>: Ensuring correctness at each stage</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/JKl3mGK.png" alt="Single-Cycle Core" style="max-width: 700px; width: 100%;">
          <p><em>Single-cycle RISC-V processor architecture</em></p>
        </div>
        
        <h4>ALU and Register File Design</h4>
        <p>Implementing key datapath components:</p>
        <ul>
          <li><strong>Register File</strong>: 32×32-bit register array with dual read ports and single write port</li>
          <li><strong>ALU Operations</strong>: Addition, subtraction, logical, and shift operations</li>
          <li><strong>Parameterized Design</strong>: Configurable bit width and feature set</li>
          <li><strong>Zero Detection</strong>: Flag for branch decisions</li>
          <li><strong>Hardware Resource Optimization</strong>: Balancing performance and area</li>
        </ul>
        
        <h4>Control Unit Development</h4>
        <p>Creating the brain of the processor:</p>
        <ul>
          <li><strong>Instruction Decoder</strong>: Parsing instruction fields (opcode, funct3, etc.)</li>
          <li><strong>Control Signal Generation</strong>: Determining operations for each instruction</li>
          <li><strong>Branch Logic</strong>: Handling conditional branches and jumps</li>
          <li><strong>Memory Control</strong>: Managing load and store operations</li>
          <li><strong>Implementation Options</strong>: Hardwired vs. microcode approaches</li>
        </ul>
        
        <h4>Testing with Assembly Programs</h4>
        <p>Verifying the core with real code:</p>
        <ul>
          <li><strong>Test Program Development</strong>: Writing assembly code to exercise the processor</li>
          <li><strong>Assembler Usage</strong>: Converting assembly to machine code</li>
          <li><strong>Memory Initialization</strong>: Loading programs into instruction memory</li>
          <li><strong>Waveform Analysis</strong>: Examining signal behavior in simulation</li>
          <li><strong>Debugging Techniques</strong>: Identifying and fixing implementation issues</li>
        </ul>
        
        <h4>Performance and Resource Utilization Analysis</h4>
        <p>Evaluating the implementation:</p>
        <ul>
          <li><strong>CPI Analysis</strong>: Calculating cycles per instruction (always 1 for single-cycle)</li>
          <li><strong>Critical Path Identification</strong>: Finding the speed-limiting path</li>
          <li><strong>Resource Usage</strong>: Measuring LUTs, FFs, memory usage</li>
          <li><strong>Performance Bottlenecks</strong>: Understanding design limitations</li>
          <li><strong>Enhancement Possibilities</strong>: Identifying potential improvements</li>
        </ul>
      `
    },
    {
      id: "16.2",
      title: "Pipelined Core Development",
      content: `
        <h3>Advancing to Pipelined Architecture</h3>
        <p>This project extends the single-cycle design to a more efficient pipelined implementation.</p>
        
        <h4>5-stage Pipeline Implementation</h4>
        <p>Transforming the design into a classic RISC pipeline:</p>
        <ul>
          <li><strong>Pipeline Stages</strong>: Instruction Fetch (IF), Decode (ID), Execute (EX), Memory (MEM), Writeback (WB)</li>
          <li><strong>Pipeline Registers</strong>: Adding storage between stages</li>
          <li><strong>Control Signal Propagation</strong>: Passing control signals through the pipeline</li>
          <li><strong>Stage-by-Stage Implementation</strong>: Incremental development and testing</li>
          <li><strong>Structural Refactoring</strong>: Reorganizing the single-cycle design</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/R3TYPqd.png" alt="Pipelined Core" style="max-width: 700px; width: 100%;">
          <p><em>5-stage pipelined RISC-V processor architecture</em></p>
        </div>
        
        <h4>Hazard Detection and Forwarding Logic</h4>
        <p>Addressing data dependencies in the pipeline:</p>
        <ul>
          <li><strong>Data Hazard Types</strong>: RAW, WAR, WAW dependencies</li>
          <li><strong>Hazard Detection Unit</strong>: Identifying potential conflicts</li>
          <li><strong>Forwarding Paths</strong>: Bypassing results to earlier stages</li>
          <li><strong>Forwarding Control</strong>: Determining when and what to forward</li>
          <li><strong>Pipeline Stalling</strong>: Handling hazards that can't be forwarded</li>
        </ul>
        
        <h4>Branch Prediction Implementation</h4>
        <p>Reducing the branch penalty:</p>
        <ul>
          <li><strong>Static Prediction Schemes</strong>: Always-taken, always-not-taken, BTFN</li>
          <li><strong>Branch Resolution</strong>: Determining actual branch outcome</li>
          <li><strong>Pipeline Flushing</strong>: Handling mispredictions</li>
          <li><strong>Branch Target Calculation</strong>: Early computation of branch destinations</li>
          <li><strong>Performance Impact Analysis</strong>: Measuring prediction effectiveness</li>
        </ul>
        
        <h4>Pipeline Performance Analysis</h4>
        <p>Evaluating the pipelined implementation:</p>
        <ul>
          <li><strong>Throughput Measurement</strong>: Instructions per cycle (IPC)</li>
          <li><strong>Stall Analysis</strong>: Identifying sources of pipeline bubbles</li>
          <li><strong>Critical Path Evaluation</strong>: Maximum frequency potential</li>
          <li><strong>Hazard Impact</strong>: Quantifying performance loss from hazards</li>
          <li><strong>Resource Utilization</strong>: Comparing with single-cycle design</li>
        </ul>
        
        <h4>Comparison with Single-Cycle Design</h4>
        <p>Understanding the tradeoffs:</p>
        <ul>
          <li><strong>Performance Comparison</strong>: Throughput and latency analysis</li>
          <li><strong>Resource Usage</strong>: Additional hardware requirements</li>
          <li><strong>Design Complexity</strong>: Implementation and verification challenges</li>
          <li><strong>Clock Frequency</strong>: Maximum operating frequency comparison</li>
          <li><strong>Power Efficiency</strong>: Energy per instruction analysis</li>
        </ul>
      `
    },
    {
      id: "16.3",
      title: "Memory Hierarchy Implementation",
      content: `
        <h3>Building an Efficient Memory System</h3>
        <p>This project focuses on implementing a complete memory hierarchy for the RISC-V processor.</p>
        
        <h4>Cache Controller Design</h4>
        <p>Implementing the brain of the cache system:</p>
        <ul>
          <li><strong>Cache Controller FSM</strong>: State machine for handling requests</li>
          <li><strong>Tag Comparison Logic</strong>: Determining cache hits/misses</li>
          <li><strong>Replacement Policy</strong>: Implementing LRU or other algorithms</li>
          <li><strong>Write Policy</strong>: Write-through or write-back handling</li>
          <li><strong>Memory Interface</strong>: Communication with lower memory levels</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/8WIL5sK.png" alt="Memory Hierarchy" style="max-width: 700px; width: 100%;">
          <p><em>RISC-V processor memory hierarchy architecture</em></p>
        </div>
        
        <h4>Parameterized Cache Implementation</h4>
        <p>Creating flexible cache structures:</p>
        <ul>
          <li><strong>Configurable Cache Size</strong>: Adjustable total capacity</li>
          <li><strong>Associativity Options</strong>: Direct-mapped to fully-associative</li>
          <li><strong>Line Size Selection</strong>: Configurable cache line width</li>
          <li><strong>Tag and Data Storage</strong>: Efficient memory implementation</li>
          <li><strong>Status Bits</strong>: Valid, dirty, LRU tracking</li>
        </ul>
        
        <h4>Virtual Memory Implementation</h4>
        <p>Adding address translation capabilities:</p>
        <ul>
          <li><strong>TLB Design</strong>: Translation lookaside buffer structure</li>
          <li><strong>Page Table Walker</strong>: Hardware or software page table traversal</li>
          <li><strong>Address Translation Process</strong>: Virtual to physical mapping</li>
          <li><strong>Memory Protection</strong>: Permission checking</li>
          <li><strong>Exception Handling</strong>: Managing page faults</li>
        </ul>
        
        <h4>Memory System Benchmarking</h4>
        <p>Measuring and optimizing performance:</p>
        <ul>
          <li><strong>Cache Hit Rate Analysis</strong>: Measuring and improving hit ratios</li>
          <li><strong>Access Latency</strong>: Timing for different memory operations</li>
          <li><strong>Bandwidth Measurement</strong>: Data transfer rates</li>
          <li><strong>Benchmark Programs</strong>: Representative workloads for testing</li>
          <li><strong>Configuration Exploration</strong>: Finding optimal parameters</li>
        </ul>
      `
    },
    {
      id: "16.4",
      title: "Full SoC Integration",
      content: `
        <h3>Creating a Complete RISC-V System</h3>
        <p>This project combines the processor core with peripherals to create a functional system-on-chip.</p>
        
        <h4>Adding Peripherals (UART, GPIO, Timers)</h4>
        <p>Implementing essential I/O capabilities:</p>
        <ul>
          <li><strong>UART Controller</strong>: Serial communication interface</li>
          <li><strong>GPIO Module</strong>: General-purpose input/output management</li>
          <li><strong>Timer/Counter</strong>: Time keeping and event generation</li>
          <li><strong>Interrupt Controllers</strong>: Coordinating device interrupts</li>
          <li><strong>Memory-Mapped I/O</strong>: Register interface for peripherals</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/2pFGn9K.png" alt="RISC-V SoC" style="max-width: 700px; width: 100%;">
          <p><em>Complete RISC-V SoC with peripherals and interconnect</em></p>
        </div>
        
        <h4>Bus Interconnect Implementation</h4>
        <p>Creating the communication fabric:</p>
        <ul>
          <li><strong>Bus Protocol Selection</strong>: Implementing AXI, TileLink, or custom protocol</li>
          <li><strong>Address Decoding</strong>: Routing transactions to appropriate peripherals</li>
          <li><strong>Arbitration</strong>: Managing multiple masters</li>
          <li><strong>Data Width Conversion</strong>: Handling different interface widths</li>
          <li><strong>Clock Domain Crossing</strong>: Managing different timing domains</li>
        </ul>
        
        <h4>Interrupt Controller Integration</h4>
        <p>Managing external events:</p>
        <ul>
          <li><strong>PLIC Implementation</strong>: Platform-level interrupt controller</li>
          <li><strong>CLIC Alternative</strong>: Core-local interrupt controller</li>
          <li><strong>Interrupt Prioritization</strong>: Handling multiple simultaneous interrupts</li>
          <li><strong>Interrupt Context Saving</strong>: Preserving processor state</li>
          <li><strong>Vectored Interrupts</strong>: Efficient handler dispatch</li>
        </ul>
        
        <h4>Bare-metal Software Development</h4>
        <p>Programming the integrated system:</p>
        <ul>
          <li><strong>Boot Code</strong>: Initialization sequence implementation</li>
          <li><strong>Device Drivers</strong>: Software interfaces for peripherals</li>
          <li><strong>Interrupt Handlers</strong>: Servicing external events</li>
          <li><strong>Memory Map Definition</strong>: Software-visible address space</li>
          <li><strong>Example Applications</strong>: Demonstrating system capabilities</li>
        </ul>
        
        <h4>OS Porting (FreeRTOS or Linux)</h4>
        <p>Adding operating system support:</p>
        <ul>
          <li><strong>FreeRTOS Port</strong>: Real-time operating system integration</li>
          <li><strong>Linux Porting</strong>: Supporting a full-featured OS</li>
          <li><strong>Boot Loader</strong>: Multi-stage boot process</li>
          <li><strong>Device Tree</strong>: Hardware description for the OS</li>
          <li><strong>System Calls</strong>: Supporting privileged operations</li>
        </ul>
      `
    },
    {
      id: "16.5",
      title: "Advanced Implementation Projects",
      content: `
        <h3>Exploring Advanced RISC-V Features</h3>
        <p>These projects extend basic implementations with sophisticated capabilities.</p>
        
        <h4>Vector Processor Extension</h4>
        <p>Implementing RISC-V vector capabilities:</p>
        <ul>
          <li><strong>Vector Register File</strong>: Storage for vector data</li>
          <li><strong>Vector ALU</strong>: Parallel arithmetic operations</li>
          <li><strong>Vector Memory Unit</strong>: Efficient vector loads/stores</li>
          <li><strong>Vector Length Configuration</strong>: Dynamic vector length handling</li>
          <li><strong>Mask Processing</strong>: Conditional vector operations</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/NMYPcK3.png" alt="Advanced RISC-V Features" style="max-width: 700px; width: 100%;">
          <p><em>Advanced RISC-V processor implementations</em></p>
        </div>
        
        <h4>Out-of-order Execution Features</h4>
        <p>Building a superscalar RISC-V core:</p>
        <ul>
          <li><strong>Instruction Window</strong>: Managing multiple in-flight instructions</li>
          <li><strong>Register Renaming</strong>: Eliminating false dependencies</li>
          <li><strong>Reservation Stations</strong>: Instruction waiting for operands</li>
          <li><strong>Reorder Buffer</strong>: Ensuring in-order commitment</li>
          <li><strong>Branch Prediction</strong>: Advanced prediction techniques</li>
        </ul>
        
        <h4>Multi-core Implementation</h4>
        <p>Creating a parallel processing system:</p>
        <ul>
          <li><strong>Multi-core Architecture</strong>: Connecting multiple processor cores</li>
          <li><strong>Cache Coherence Protocol</strong>: Maintaining memory consistency</li>
          <li><strong>Atomic Operations</strong>: Supporting synchronization primitives</li>
          <li><strong>Interconnect Topology</strong>: Core-to-core communication</li>
          <li><strong>Symmetric Multiprocessing</strong>: Balancing workloads</li>
        </ul>
        
        <h4>Custom Instruction Extension</h4>
        <p>Adding specialized instructions:</p>
        <ul>
          <li><strong>Instruction Encoding</strong>: Defining custom opcodes</li>
          <li><strong>Datapath Extensions</strong>: Hardware for new operations</li>
          <li><strong>Control Logic Modifications</strong>: Supporting custom execution</li>
          <li><strong>Compiler Support</strong>: Enabling software use of extensions</li>
          <li><strong>Performance Analysis</strong>: Measuring improvement from customization</li>
        </ul>
        
        <h4>Domain-specific Accelerator Integration</h4>
        <p>Adding specialized compute engines:</p>
        <ul>
          <li><strong>Accelerator Interface</strong>: Connecting to the processor</li>
          <li><strong>Data Transfer Mechanisms</strong>: Moving data to/from accelerators</li>
          <li><strong>Control and Status</strong>: Managing accelerator operation</li>
          <li><strong>Memory Coherence</strong>: Handling shared data</li>
          <li><strong>Software Stack</strong>: Programming model for the accelerator</li>
        </ul>
      `
    },
    {
      id: "16.6",
      title: "Full-System Demonstration",
      content: `
        <h3>Showcasing a Complete RISC-V System</h3>
        <p>This capstone project demonstrates a fully functional RISC-V implementation running real applications.</p>
        
        <h4>Application Development</h4>
        <p>Creating software to demonstrate system capabilities:</p>
        <ul>
          <li><strong>Demo Applications</strong>: Showcasing system features</li>
          <li><strong>Benchmark Programs</strong>: Measuring performance</li>
          <li><strong>Interactive Demonstrations</strong>: User-facing applications</li>
          <li><strong>Software Development Tools</strong>: Compiler and debugger setup</li>
          <li><strong>OS Integration</strong>: Operating system support</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/L5DcRzX.png" alt="Full System Demonstration" style="max-width: 700px; width: 100%;">
          <p><em>Complete RISC-V system demonstration architecture</em></p>
        </div>
        
        <h4>System Performance Benchmarking</h4>
        <p>Measuring and analyzing system performance:</p>
        <ul>
          <li><strong>Standard Benchmarks</strong>: CoreMark, Dhrystone, Embench</li>
          <li><strong>Application-specific Tests</strong>: Relevant workload performance</li>
          <li><strong>Performance Profiling</strong>: Identifying bottlenecks</li>
          <li><strong>Comparative Analysis</strong>: Benchmarking against alternatives</li>
          <li><strong>Performance Visualization</strong>: Graphing results</li>
        </ul>
        
        <h4>Power and Area Optimization</h4>
        <p>Refining the implementation for efficiency:</p>
        <ul>
          <li><strong>Power Analysis</strong>: Measuring consumption under different workloads</li>
          <li><strong>Power Optimization</strong>: Reducing energy usage</li>
          <li><strong>Area Reduction</strong>: Minimizing resource utilization</li>
          <li><strong>Critical Path Optimization</strong>: Improving timing margins</li>
          <li><strong>Implementation Tradeoffs</strong>: Balancing various constraints</li>
        </ul>
        
        <h4>Documentation and Presentation</h4>
        <p>Preparing project artifacts:</p>
        <ul>
          <li><strong>Technical Documentation</strong>: Architecture and implementation details</li>
          <li><strong>User Guides</strong>: Instructions for using the system</li>
          <li><strong>Design Rationale</strong>: Explaining implementation choices</li>
          <li><strong>Presentation Materials</strong>: Slides and demonstration scripts</li>
          <li><strong>Project Repository</strong>: Well-organized code and documentation</li>
        </ul>
        
        <h4>Future Enhancement Roadmap</h4>
        <p>Planning for continued development:</p>
        <ul>
          <li><strong>Feature Extensions</strong>: Additional capabilities to add</li>
          <li><strong>Performance Improvements</strong>: Opportunities for optimization</li>
          <li><strong>Integration Options</strong>: Potential system expansions</li>
          <li><strong>Research Directions</strong>: Areas for further exploration</li>
          <li><strong>Technology Transfer</strong>: Paths to practical application</li>
        </ul>
      `
    }
  ],
  examples: [
    {
      id: "example16_1",
      title: "Single-Cycle RISC-V Core (Top Module)",
      description: "Verilog implementation of a simple RV32I single-cycle processor top module",
      code: `module riscv_core_single_cycle (
  input  logic        clk,
  input  logic        rst_n,
  // Instruction memory interface
  output logic [31:0] instr_addr,
  input  logic [31:0] instr_data,
  // Data memory interface
  output logic [31:0] data_addr,
  output logic [31:0] data_wdata,
  input  logic [31:0] data_rdata,
  output logic        data_we,
  output logic [3:0]  data_be,  // Byte enable
  // Debug signals
  output logic [31:0] debug_pc,
  output logic [31:0] debug_reg_x10
);

  // Internal signals
  logic [31:0] pc_current;
  logic [31:0] pc_next;
  logic [31:0] instr;
  logic [31:0] reg_rdata1, reg_rdata2;
  logic [31:0] alu_result;
  logic [31:0] immediate;
  logic [31:0] alu_op2;
  logic [31:0] writeback_data;
  
  // Control signals
  logic        branch;
  logic        jump;
  logic        alu_src;
  logic [3:0]  alu_op;
  logic        mem_write;
  logic        mem_read;
  logic        mem_to_reg;
  logic        reg_write;
  logic [2:0]  imm_sel;
  logic        zero_flag;
  logic        branch_taken;

  // Program Counter Logic
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n)
      pc_current <= 32'h00000000;
    else
      pc_current <= pc_next;
  end
  
  // PC Next calculation logic
  assign branch_taken = branch & (zero_flag ^ instr[12]);  // BEQZ or BNEZ
  assign pc_next = branch_taken ? (pc_current + immediate) :
                  jump         ? (pc_current + immediate) :
                                 (pc_current + 4);
  
  // Instruction fetch
  assign instr_addr = pc_current;
  assign instr = instr_data;
  
  // Debug outputs
  assign debug_pc = pc_current;
  
  // Control Unit
  control_unit control (
    .opcode(instr[6:0]),
    .funct3(instr[14:12]),
    .funct7(instr[31:25]),
    .branch(branch),
    .jump(jump),
    .alu_src(alu_src),
    .alu_op(alu_op),
    .mem_write(mem_write),
    .mem_read(mem_read),
    .mem_to_reg(mem_to_reg),
    .reg_write(reg_write),
    .imm_sel(imm_sel)
  );
  
  // Immediate Generation
  immediate_gen imm_gen (
    .instr(instr),
    .imm_sel(imm_sel),
    .immediate(immediate)
  );
  
  // Register File
  register_file reg_file (
    .clk(clk),
    .rst_n(rst_n),
    .rs1_addr(instr[19:15]),
    .rs2_addr(instr[24:20]),
    .rd_addr(instr[11:7]),
    .rd_data(writeback_data),
    .reg_write(reg_write),
    .rs1_data(reg_rdata1),
    .rs2_data(reg_rdata2),
    .x10_data(debug_reg_x10)  // Debug output
  );
  
  // ALU input mux
  assign alu_op2 = alu_src ? immediate : reg_rdata2;
  
  // ALU
  alu alu_unit (
    .op1(reg_rdata1),
    .op2(alu_op2),
    .operation(alu_op),
    .result(alu_result),
    .zero(zero_flag)
  );
  
  // Memory interface
  assign data_addr = alu_result;
  assign data_wdata = reg_rdata2;
  assign data_we = mem_write;
  assign data_be = 4'b1111;  // For now, all byte enables active
  
  // Writeback mux
  assign writeback_data = mem_to_reg ? data_rdata : alu_result;

endmodule

// Sub-modules would be implemented separately:
// - control_unit
// - immediate_gen
// - register_file
// - alu`,
    },
    {
      id: "example16_2",
      title: "Hazard Detection and Forwarding Unit",
      description: "Verilog implementation of hazard detection and forwarding logic for a pipelined RISC-V processor",
      code: `module hazard_forwarding_unit (
  // Instruction information from different pipeline stages
  input  logic [4:0]  id_rs1,
  input  logic [4:0]  id_rs2,
  input  logic        id_rs1_used,
  input  logic        id_rs2_used,
  input  logic [4:0]  ex_rd,
  input  logic        ex_reg_write,
  input  logic        ex_mem_read,
  input  logic [4:0]  mem_rd, 
  input  logic        mem_reg_write,
  input  logic [4:0]  wb_rd,
  input  logic        wb_reg_write,
  
  // Forwarding control outputs
  output logic [1:0]  forward_op1_sel,
  output logic [1:0]  forward_op2_sel,
  
  // Hazard control outputs
  output logic        pipeline_stall
);

  // Forwarding logic for ALU operand 1
  always_comb begin
    if (ex_reg_write && ex_rd != 0 && ex_rd == id_rs1 && id_rs1_used)
      forward_op1_sel = 2'b01;  // Forward from EX stage
    else if (mem_reg_write && mem_rd != 0 && mem_rd == id_rs1 && id_rs1_used)
      forward_op1_sel = 2'b10;  // Forward from MEM stage
    else if (wb_reg_write && wb_rd != 0 && wb_rd == id_rs1 && id_rs1_used)
      forward_op1_sel = 2'b11;  // Forward from WB stage
    else
      forward_op1_sel = 2'b00;  // No forwarding, use reg file output
  end
  
  // Forwarding logic for ALU operand 2
  always_comb begin
    if (ex_reg_write && ex_rd != 0 && ex_rd == id_rs2 && id_rs2_used)
      forward_op2_sel = 2'b01;  // Forward from EX stage
    else if (mem_reg_write && mem_rd != 0 && mem_rd == id_rs2 && id_rs2_used)
      forward_op2_sel = 2'b10;  // Forward from MEM stage
    else if (wb_reg_write && wb_rd != 0 && wb_rd == id_rs2 && id_rs2_used)
      forward_op2_sel = 2'b11;  // Forward from WB stage
    else
      forward_op2_sel = 2'b00;  // No forwarding, use reg file output
  end
  
  // Load-use hazard detection (when a load is followed by an instruction that uses the result)
  assign pipeline_stall = ex_mem_read && ((ex_rd == id_rs1 && id_rs1_used) || 
                                        (ex_rd == id_rs2 && id_rs2_used));

endmodule

// Example of how this unit integrates into the pipeline
module pipeline_integration_example (
  input  logic        clk,
  input  logic        rst_n,
  // Other inputs and outputs...
);

  // Pipeline stage registers
  // IF/ID pipeline registers
  logic [31:0] if_id_pc;
  logic [31:0] if_id_instruction;
  
  // ID/EX pipeline registers
  logic [31:0] id_ex_pc;
  logic [31:0] id_ex_reg_data1;
  logic [31:0] id_ex_reg_data2;
  logic [4:0]  id_ex_rs1;
  logic [4:0]  id_ex_rs2;
  logic [4:0]  id_ex_rd;
  logic        id_ex_reg_write;
  logic        id_ex_mem_read;
  // ... other control signals
  
  // EX/MEM pipeline registers
  logic [31:0] ex_mem_alu_result;
  logic [31:0] ex_mem_write_data;
  logic [4:0]  ex_mem_rd;
  logic        ex_mem_reg_write;
  // ... other control signals
  
  // MEM/WB pipeline registers
  logic [31:0] mem_wb_alu_result;
  logic [31:0] mem_wb_read_data;
  logic [4:0]  mem_wb_rd;
  logic        mem_wb_reg_write;
  // ... other control signals
  
  // Hazard and forwarding control signals
  logic [1:0]  forward_op1_sel;
  logic [1:0]  forward_op2_sel;
  logic        pipeline_stall;
  logic        flush_if_id;
  
  // Internal signals
  logic [31:0] alu_op1;
  logic [31:0] alu_op2;
  logic [31:0] alu_result;
  
  // Hazard detection and forwarding unit
  hazard_forwarding_unit hazard_forward (
    .id_rs1(if_id_instruction[19:15]),
    .id_rs2(if_id_instruction[24:20]),
    .id_rs1_used(rs1_used),  // Derived from instruction decode
    .id_rs2_used(rs2_used),  // Derived from instruction decode
    .ex_rd(id_ex_rd),
    .ex_reg_write(id_ex_reg_write),
    .ex_mem_read(id_ex_mem_read),
    .mem_rd(ex_mem_rd),
    .mem_reg_write(ex_mem_reg_write),
    .wb_rd(mem_wb_rd),
    .wb_reg_write(mem_wb_reg_write),
    .forward_op1_sel(forward_op1_sel),
    .forward_op2_sel(forward_op2_sel),
    .pipeline_stall(pipeline_stall)
  );
  
  // Example of the forwarding mux for ALU operand 1
  always_comb begin
    case (forward_op1_sel)
      2'b00: alu_op1 = id_ex_reg_data1;             // Normal path from register file
      2'b01: alu_op1 = alu_result;                  // Forward from ALU output (EX stage)
      2'b10: alu_op1 = ex_mem_alu_result;           // Forward from MEM stage
      2'b11: alu_op1 = mem_wb_reg_write_data;       // Forward from WB stage
    endcase
  end
  
  // Stall and flush control for pipeline registers
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      // Reset all pipeline registers
    end else begin
      // Update IF/ID registers (stall if needed)
      if (!pipeline_stall) begin
        if (flush_if_id) begin
          if_id_instruction <= 32'h00000013;  // NOP (addi x0, x0, 0)
          if_id_pc <= if_id_pc;
        end else begin
          if_id_instruction <= instruction_memory_output;
          if_id_pc <= pc_current;
        end
      end
      
      // Other pipeline registers...
    end
  end
  
  // Rest of the pipeline implementation...

endmodule`
    }
  ]
};

export default chapter16; 