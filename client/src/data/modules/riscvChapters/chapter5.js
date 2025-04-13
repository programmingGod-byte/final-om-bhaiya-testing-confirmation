const chapter5 = {
  id: 5,
  title: "Pipeline Fundamentals",
  description: "Introduction to pipelining concepts for processor design",
  estimatedTime: "3 hours",
  completed: false,
  sections: [
    {
      id: "5.1",
      title: "Pipelining Concept and Benefits",
      content: `
        <h3>Understanding Processor Pipelining</h3>
        <p>Pipelining is a technique that improves processor performance by overlapping the execution of multiple instructions, similar to an assembly line in manufacturing.</p>
        
        <h4>The Pipelining Concept</h4>
        <p>In a pipelined processor, instruction execution is divided into distinct stages, with each stage performing a specific portion of the instruction's execution:</p>
        <ul>
          <li><strong>Sequential Execution</strong>: Without pipelining, each instruction must complete fully before the next one begins</li>
          <li><strong>Overlapped Execution</strong>: With pipelining, different stages of multiple instructions execute simultaneously</li>
          <li><strong>Assembly Line Analogy</strong>: Just as cars can be at different stages of assembly simultaneously, instructions can be at different stages of execution</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/JgTDfnU.png" alt="Pipelining Concept" style="max-width: 700px; width: 100%;">
          <p><em>Comparison of non-pipelined vs. pipelined execution</em></p>
        </div>
        
        <h4>Performance Benefits</h4>
        <p>Pipelining offers several key performance advantages:</p>
        
        <ul>
          <li><strong>Increased Throughput</strong>: While the latency for a single instruction remains similar, the processor completes more instructions per unit time</li>
          <li><strong>Improved Clock Frequency</strong>: Each pipeline stage has a shorter critical path, allowing for higher clock speeds</li>
          <li><strong>Better Hardware Utilization</strong>: Different functional units are active simultaneously, reducing idle time</li>
        </ul>
        
        <p>These benefits can be quantified:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Metric</th>
            <th>Non-pipelined</th>
            <th>Pipelined (5 stages)</th>
          </tr>
          <tr>
            <td>Instruction Latency</td>
            <td>1 cycle</td>
            <td>5 cycles</td>
          </tr>
          <tr>
            <td>Maximum Throughput</td>
            <td>1 instruction per cycle</td>
            <td>1 instruction per cycle</td>
          </tr>
          <tr>
            <td>Clock Period</td>
            <td>Sum of all stage delays</td>
            <td>Maximum stage delay</td>
          </tr>
          <tr>
            <td>Relative Performance</td>
            <td>1×</td>
            <td>Up to 5× (ideal)</td>
          </tr>
        </table>
        
        <h4>Real-world Performance</h4>
        <p>In practice, several factors prevent achieving the theoretical maximum speedup:</p>
        <ul>
          <li><strong>Pipeline Hazards</strong>: Dependencies between instructions can cause stalls</li>
          <li><strong>Branch Penalties</strong>: Incorrect branch predictions cause pipeline flushes</li>
          <li><strong>Pipeline Overhead</strong>: Pipeline registers and control logic add complexity</li>
          <li><strong>Memory Latency</strong>: Cache misses can stall the entire pipeline</li>
        </ul>
        
        <p>Despite these limitations, pipelining remains one of the most important techniques for improving processor performance.</p>
      `
    },
    {
      id: "5.2",
      title: "RISC-V 5-Stage Pipeline",
      content: `
        <h3>Classic 5-Stage RISC Pipeline</h3>
        <p>The RISC-V architecture is particularly well-suited for pipelining due to its regular instruction format and load-store design. The classic 5-stage pipeline includes:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/m94CpZW.png" alt="5-Stage RISC-V Pipeline" style="max-width: 700px; width: 100%;">
          <p><em>The five stages of a classic RISC-V pipeline</em></p>
        </div>
        
        <h4>Pipeline Stages</h4>
        <ol>
          <li><strong>Instruction Fetch (IF)</strong>
            <ul>
              <li>Fetch instruction from memory at address in PC</li>
              <li>Increment PC to point to next instruction (PC + 4)</li>
              <li>Store fetched instruction in IF/ID pipeline register</li>
            </ul>
          </li>
          <li><strong>Instruction Decode (ID)</strong>
            <ul>
              <li>Decode instruction opcode to determine instruction type</li>
              <li>Read values from register file</li>
              <li>Generate immediate value from instruction</li>
              <li>Compute branch target address</li>
              <li>Store values in ID/EX pipeline register</li>
            </ul>
          </li>
          <li><strong>Execute (EX)</strong>
            <ul>
              <li>Perform ALU operations (arithmetic, logic, shifts)</li>
              <li>Calculate memory address for load/store instructions</li>
              <li>Evaluate branch conditions</li>
              <li>Store results in EX/MEM pipeline register</li>
            </ul>
          </li>
          <li><strong>Memory Access (MEM)</strong>
            <ul>
              <li>Access memory for load and store instructions</li>
              <li>Read data from memory (load) or write data to memory (store)</li>
              <li>Store results in MEM/WB pipeline register</li>
            </ul>
          </li>
          <li><strong>Write Back (WB)</strong>
            <ul>
              <li>Write results back to register file</li>
              <li>Results can come from ALU operation or memory load</li>
            </ul>
          </li>
        </ol>
        
        <h4>Pipeline Registers</h4>
        <p>Pipeline registers separate each stage, storing intermediate results and control signals:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Pipeline Register</th>
            <th>Key Contents</th>
          </tr>
          <tr>
            <td>IF/ID</td>
            <td>Instruction, PC+4</td>
          </tr>
          <tr>
            <td>ID/EX</td>
            <td>Register values, Immediate value, Control signals, PC</td>
          </tr>
          <tr>
            <td>EX/MEM</td>
            <td>ALU result, Store data, Control signals</td>
          </tr>
          <tr>
            <td>MEM/WB</td>
            <td>Memory data, ALU result, Control signals</td>
          </tr>
        </table>
        
        <p>These registers create "boundaries" between stages, allowing each stage to operate independently on different instructions.</p>
        
        <h4>Pipeline Control Signals</h4>
        <p>Control signals are generated in the decode stage and passed down the pipeline:</p>
        <ul>
          <li><strong>EX Stage Controls</strong>: ALU operation, ALU source selection</li>
          <li><strong>MEM Stage Controls</strong>: Memory read, Memory write</li>
          <li><strong>WB Stage Controls</strong>: Register write, Memory-to-register selection</li>
        </ul>
        
        <p>This approach, where control signals "flow" with the instruction, simplifies pipeline control logic.</p>
      `
    },
    {
      id: "5.3",
      title: "Pipeline Hazards Introduction",
      content: `
        <h3>Challenges in Pipeline Execution</h3>
        <p>Pipeline hazards are situations that prevent the next instruction in the pipeline from executing during its designated clock cycle. There are three main types of hazards:</p>
        
        <h4>1. Structural Hazards</h4>
        <p>Structural hazards occur when multiple instructions attempt to use the same hardware resource simultaneously.</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/JGkYOlm.png" alt="Structural Hazard" style="max-width: 600px; width: 100%;">
          <p><em>Example of a structural hazard with memory access conflict</em></p>
        </div>
        
        <p><strong>Common examples:</strong></p>
        <ul>
          <li>Memory access conflicts (instruction fetch vs. data load/store)</li>
          <li>Register file access conflicts (reading vs. writing)</li>
          <li>Execution unit conflicts (single ALU needed for multiple operations)</li>
        </ul>
        
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Duplicate resources (separate instruction and data memories/caches)</li>
          <li>Multi-ported register files</li>
          <li>Resource scheduling to avoid conflicts</li>
        </ul>
        
        <h4>2. Data Hazards</h4>
        <p>Data hazards occur when an instruction depends on the results of a previous instruction that hasn't completed execution.</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/2dPWCmS.png" alt="Data Hazard" style="max-width: 600px; width: 100%;">
          <p><em>Example of a data hazard with register dependency</em></p>
        </div>
        
        <p><strong>Types of data hazards:</strong></p>
        <ul>
          <li><strong>Read-After-Write (RAW)</strong>: An instruction tries to read a source before a previous instruction writes to it</li>
          <li><strong>Write-After-Read (WAR)</strong>: An instruction tries to write to a destination before a previous instruction reads it</li>
          <li><strong>Write-After-Write (WAW)</strong>: Two instructions try to write to the same destination</li>
        </ul>
        
        <p><strong>Detection:</strong></p>
        <p>RAW hazards can be detected by comparing source registers of the current instruction with destination registers of instructions in the pipeline.</p>
        
        <p><strong>Solutions (preview):</strong></p>
        <ul>
          <li>Forwarding/bypassing (covered in detail in Chapter 8)</li>
          <li>Pipeline stalling/bubbles</li>
          <li>Instruction reordering (by compiler)</li>
        </ul>
        
        <h4>3. Control Hazards</h4>
        <p>Control hazards occur when the flow of instruction execution is changed unexpectedly, typically by branch or jump instructions.</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/kXNXVBM.png" alt="Control Hazard" style="max-width: 600px; width: 100%;">
          <p><em>Example of a control hazard with branch instruction</em></p>
        </div>
        
        <p><strong>Problem:</strong> When a branch is encountered, the processor doesn't know which instruction to fetch next until the branch condition is evaluated (typically in the EX stage).</p>
        
        <p><strong>Solutions (preview):</strong></p>
        <ul>
          <li>Branch prediction (covered in detail in Chapter 9)</li>
          <li>Delayed branches</li>
          <li>Branch target buffers</li>
          <li>Speculative execution</li>
        </ul>
        
        <p>These hazards will be explored in detail in subsequent chapters, along with their solutions.</p>
      `
    },
    {
      id: "5.4",
      title: "Pipeline Performance Analysis",
      content: `
        <h3>Evaluating Pipeline Efficiency</h3>
        <p>Understanding pipeline performance requires analyzing several key metrics and understanding the factors that affect real-world performance.</p>
        
        <h4>Ideal Pipeline Performance</h4>
        <p>In an ideal pipeline with no hazards or stalls:</p>
        <ul>
          <li><strong>First Instruction Latency</strong>: n cycles (where n is the number of pipeline stages)</li>
          <li><strong>Subsequent Instruction Latency</strong>: 1 cycle</li>
          <li><strong>Throughput</strong>: 1 instruction per cycle (IPC = 1.0)</li>
          <li><strong>Speedup</strong>: Approaches the number of pipeline stages compared to a non-pipelined implementation</li>
        </ul>
        
        <p>For a program with m instructions executed on an n-stage pipeline:</p>
        <p style="text-align: center;"><strong>Execution Time = (m + n - 1) cycles</strong></p>
        
        <p>As m becomes large, this approaches:</p>
        <p style="text-align: center;"><strong>Execution Time ≈ m cycles</strong></p>
        
        <h4>Real Pipeline Performance</h4>
        <p>In practice, several factors reduce pipeline efficiency:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Factor</th>
            <th>Impact</th>
          </tr>
          <tr>
            <td>Data Hazards</td>
            <td>Stalls that prevent the pipeline from accepting new instructions</td>
          </tr>
          <tr>
            <td>Control Hazards</td>
            <td>Pipeline flushes that discard work already done</td>
          </tr>
          <tr>
            <td>Memory Stalls</td>
            <td>Long latency memory accesses (cache misses) that block the pipeline</td>
          </tr>
          <tr>
            <td>Structural Hazards</td>
            <td>Resource conflicts that force serialization</td>
          </tr>
          <tr>
            <td>Pipeline Overhead</td>
            <td>Extra hardware and complexity that increases cycle time</td>
          </tr>
        </table>
        
        <h4>Key Performance Metrics</h4>
        <p>Several metrics help evaluate pipeline performance:</p>
        <ul>
          <li><strong>Cycles Per Instruction (CPI)</strong>: Average number of cycles to execute one instruction
            <ul>
              <li>Ideal: CPI = 1.0</li>
              <li>Typical: CPI = 1.2 - 2.0 (with hazards and stalls)</li>
            </ul>
          </li>
          <li><strong>Instructions Per Cycle (IPC)</strong>: Average number of instructions completed per cycle (IPC = 1/CPI)
            <ul>
              <li>Ideal: IPC = 1.0</li>
              <li>Typical: IPC = 0.5 - 0.8 (with hazards and stalls)</li>
            </ul>
          </li>
          <li><strong>Pipeline Efficiency</strong>: Ratio of actual to ideal throughput
            <ul>
              <li>Efficiency = (Actual IPC) / (Ideal IPC)</li>
              <li>Typically 50-80% for well-designed pipelines</li>
            </ul>
          </li>
        </ul>
        
        <h4>Example Performance Calculation</h4>
        <p>Consider a 5-stage pipeline with the following characteristics:</p>
        <ul>
          <li>20% of instructions are load/store operations</li>
          <li>15% of instructions are branches</li>
          <li>Data hazards cause 0.2 stall cycles per instruction</li>
          <li>Branch mispredictions occur 30% of the time, each causing 3 bubble cycles</li>
        </ul>
        
        <p>CPI calculation:</p>
        <ul>
          <li>Base CPI (ideal): 1.0</li>
          <li>Data hazard stalls: 0.2</li>
          <li>Branch misprediction penalty: 0.15 (branches) × 0.3 (misprediction rate) × 3 (penalty) = 0.135</li>
          <li>Total CPI = 1.0 + 0.2 + 0.135 = 1.335</li>
        </ul>
        
        <p>This means the pipeline processes one instruction every 1.335 cycles on average, or about 0.75 instructions per cycle, which is 75% of ideal throughput.</p>
      `
    }
  ],
  examples: [
    {
      id: "example5_1",
      title: "Pipeline Diagram Analysis",
      description: "Analysis of instruction flow through a 5-stage RISC-V pipeline",
      code: `Pipeline Execution Diagram

Time (cycles) →
1  2  3  4  5  6  7  8  9  10
Instr 1: IF-ID-EX-ME-WB
Instr 2:    IF-ID-EX-ME-WB
Instr 3:       IF-ID-EX-ME-WB
Instr 4:          IF-ID-EX-ME-WB
Instr 5:             IF-ID-EX-ME-WB

Legend:
IF = Instruction Fetch
ID = Instruction Decode
EX = Execute
ME = Memory Access
WB = Write Back

Example instruction sequence:
Instr 1: add  x1, x2, x3      # x1 = x2 + x3
Instr 2: sub  x4, x5, x6      # x4 = x5 - x6 
Instr 3: lw   x7, 0(x8)       # x7 = Memory[x8]
Instr 4: sw   x9, 4(x10)      # Memory[x10+4] = x9
Instr 5: beq  x11, x12, label # if(x11 == x12) goto label

Analysis:
- In cycle 5, the first instruction completes while the fifth instruction begins
- By cycle 5, all pipeline stages are active with different instructions
- The pipeline reaches steady-state operation at cycle 5
- Total cycles to execute 5 instructions: 9 (vs. 25 for non-pipelined)
- Speedup = 25/9 ≈ 2.78× (not quite 5× due to pipeline fill/drain overhead)`,
      explanation: "This example shows how five instructions flow through a 5-stage RISC-V pipeline. Each row represents an instruction, and each column represents a clock cycle. The pipeline fills gradually, reaching full utilization at cycle 5 when all stages are active with different instructions. After that, one instruction completes each cycle. Notice how the pipeline enables executing 5 instructions in just 9 cycles instead of the 25 cycles that would be required by a non-pipelined processor. The actual speedup is less than the ideal 5× because of the pipeline fill and drain overhead, which becomes less significant for longer instruction sequences."
    },
    {
      id: "example5_2",
      title: "Pipeline Hazard Detection",
      description: "Verilog implementation of a simple data hazard detection unit for a RISC-V pipeline",
      code: `module hazard_detector(
  // Instruction fields from ID stage
  input [4:0] id_rs1,    // First source register being read
  input [4:0] id_rs2,    // Second source register being read
  
  // Destination registers from later pipeline stages
  input [4:0] ex_rd,     // Destination register in EX stage
  input ex_reg_write,    // Register write enable in EX stage
  input [4:0] mem_rd,    // Destination register in MEM stage
  input mem_reg_write,   // Register write enable in MEM stage
  
  // Additional control inputs
  input ex_mem_read,     // Memory read in EX stage (for load instructions)
  
  // Hazard detection outputs
  output reg stall,      // Stall signal for pipeline
  output reg [1:0] forward_a, // Forwarding control for first ALU input
  output reg [1:0] forward_b  // Forwarding control for second ALU input
);

  // Data hazard detection for load instructions (load-use hazard)
  // This requires a pipeline stall
  always @(*) begin
    stall = 1'b0;
    if (ex_mem_read && 
        ((ex_rd == id_rs1) || (ex_rd == id_rs2)) &&
        (ex_rd != 5'b0)) begin
      stall = 1'b1;  // Stall if load result needed by next instruction
    end
  end

  // Data forwarding logic for ALU inputs
  // 00 = use register file output
  // 10 = forward from EX/MEM pipeline register (ALU result)
  // 01 = forward from MEM/WB pipeline register (ALU result or memory data)
  always @(*) begin
    // Default: No forwarding
    forward_a = 2'b00;
    forward_b = 2'b00;
    
    // Forward from MEM stage for first ALU input
    if (mem_reg_write && (mem_rd != 5'b0) && (mem_rd == id_rs1)) begin
      forward_a = 2'b01;
    end
    
    // Forward from EX stage for first ALU input (higher priority)
    if (ex_reg_write && (ex_rd != 5'b0) && (ex_rd == id_rs1)) begin
      forward_a = 2'b10;
    end
    
    // Forward from MEM stage for second ALU input
    if (mem_reg_write && (mem_rd != 5'b0) && (mem_rd == id_rs2)) begin
      forward_b = 2'b01;
    end
    
    // Forward from EX stage for second ALU input (higher priority)
    if (ex_reg_write && (ex_rd != 5'b0) && (ex_rd == id_rs2)) begin
      forward_b = 2'b10;
    end
  end
endmodule`,
      explanation: "This Verilog module implements a hazard detection unit for a RISC-V pipeline. It performs two main functions: detecting load-use hazards that require stalling the pipeline, and identifying data hazards that can be resolved by forwarding. The load-use hazard occurs when a load instruction is followed immediately by an instruction that uses the loaded value—this can't be solved by forwarding because the data isn't available in time. For other data hazards, the unit generates forwarding control signals that direct the ALU to take inputs from later pipeline stages rather than the register file, allowing execution to continue without stalls. The forwarding logic prioritizes the most recent value when multiple hazards exist."
    }
  ],
  quiz: {
    title: "Pipeline Fundamentals Quiz",
    questions: [
      {
        question: "What is the primary benefit of pipeline execution in a processor?",
        options: [
          "Reducing the latency of individual instructions",
          "Increasing instruction throughput by overlapping execution",
          "Eliminating the need for branch prediction",
          "Reducing the total number of transistors required"
        ],
        correctAnswer: 1,
        explanation: "The primary benefit of pipelining is increased throughput. By overlapping the execution of multiple instructions, a pipelined processor can complete more instructions per unit time than a non-pipelined design. While the latency for an individual instruction may remain similar or even increase slightly, the overall throughput improves significantly."
      },
      {
        question: "What does the IF stage do in a classic 5-stage RISC-V pipeline?",
        options: [
          "Computes arithmetic results and evaluates branch conditions",
          "Decodes instructions and reads register values",
          "Fetches the next instruction from memory and increments the PC",
          "Accesses data memory for loads and stores"
        ],
        correctAnswer: 2,
        explanation: "The Instruction Fetch (IF) stage fetches the next instruction from memory at the address contained in the Program Counter (PC) and increments the PC to point to the next instruction (typically PC+4). This fetched instruction is then stored in the IF/ID pipeline register."
      },
      {
        question: "What are pipeline registers used for in a pipelined processor?",
        options: [
          "Temporary storage for general-purpose data",
          "Storage for branch prediction information",
          "Capturing and holding intermediate results between pipeline stages",
          "Backup storage in case of pipeline stalls"
        ],
        correctAnswer: 2,
        explanation: "Pipeline registers are used to capture and hold intermediate results and control signals between pipeline stages. They create boundaries between stages, allowing each stage to operate independently on different instructions. Without pipeline registers, signals would propagate through multiple stages in a single cycle, defeating the purpose of pipelining."
      },
      {
        question: "Which of the following is NOT one of the three major types of pipeline hazards?",
        options: [
          "Memory hazards",
          "Data hazards",
          "Control hazards",
          "Structural hazards"
        ],
        correctAnswer: 0,
        explanation: "The three major types of pipeline hazards are: 1) Data hazards (dependencies between instructions), 2) Control hazards (branches and jumps that change instruction flow), and 3) Structural hazards (resource conflicts). 'Memory hazards' is not a standard classification, although memory access delays can cause stalls that impact pipeline performance."
      },
      {
        question: "What is the primary cause of control hazards in a pipelined processor?",
        options: [
          "Multiple instructions attempting to use the same hardware resource",
          "Instructions depending on results from previous instructions",
          "Branch and jump instructions changing the instruction flow",
          "Cache misses causing memory access delays"
        ],
        correctAnswer: 2,
        explanation: "Control hazards are primarily caused by branch and jump instructions that change the program's instruction flow. When a branch is encountered, the processor doesn't know which instruction to fetch next until the branch condition is evaluated (typically in the Execute stage), potentially causing pipeline stalls or requiring speculative execution."
      },
      {
        question: "What is a RAW (Read-After-Write) hazard?",
        options: [
          "When an instruction attempts to read a register before a previous instruction writes to it",
          "When an instruction attempts to write to a register before a previous instruction reads from it",
          "When two instructions attempt to write to the same register",
          "When two instructions attempt to read from the same register"
        ],
        correctAnswer: 0,
        explanation: "A Read-After-Write (RAW) hazard occurs when an instruction attempts to read a register before a previous instruction has written its result to that register. This is the most common type of data hazard and represents a true dependency between instructions. RAW hazards can be resolved through forwarding, stalling, or instruction reordering."
      },
      {
        question: "In an ideal 5-stage pipeline, what is the speedup compared to a non-pipelined processor?",
        options: [
          "2×",
          "3×",
          "5×",
          "10×"
        ],
        correctAnswer: 2,
        explanation: "The ideal speedup of a pipeline approaches the number of stages in the pipeline. For a 5-stage pipeline, the theoretical maximum speedup is 5×. This assumes perfect pipeline utilization with no hazards or stalls. In practice, the actual speedup will be less due to hazards, branch mispredictions, and other factors that reduce pipeline efficiency."
      },
      {
        question: "What is the CPI (Cycles Per Instruction) of an ideal pipeline with no hazards or stalls?",
        options: [
          "0.2 for a 5-stage pipeline",
          "1.0 regardless of pipeline length",
          "5.0 for a 5-stage pipeline",
          "It varies based on the instruction mix"
        ],
        correctAnswer: 1,
        explanation: "The CPI of an ideal pipeline with no hazards or stalls is 1.0, regardless of the number of pipeline stages. This means the processor completes one instruction per clock cycle on average. The number of stages affects latency (how long it takes to complete a single instruction) but not throughput in an ideal case."
      },
      {
        question: "What happens during the WriteBack (WB) stage of the RISC-V pipeline?",
        options: [
          "The ALU performs the specified operation",
          "The memory is accessed for load or store instructions",
          "Results are written back to the register file",
          "The branch condition is evaluated"
        ],
        correctAnswer: 2,
        explanation: "During the WriteBack (WB) stage, results from the operation (either from the ALU or from a memory load) are written back to the register file. This is the final stage of instruction execution, where the instruction's effects on the processor state are committed."
      },
      {
        question: "What term is used to describe the wasted cycles when a pipeline cannot accept new instructions due to hazards?",
        options: [
          "Pipeline flushes",
          "Pipeline bubbles or stalls",
          "Pipeline collisions",
          "Pipeline deadlocks"
        ],
        correctAnswer: 1,
        explanation: "Pipeline bubbles or stalls refer to the wasted cycles when a pipeline cannot accept new instructions due to hazards. A bubble is essentially a 'no-op' that propagates through the pipeline, representing a cycle where productive work isn't being done. Stalls prevent new instructions from entering the pipeline while allowing existing instructions to proceed."
      }
    ]
  }
};

export default chapter5; 