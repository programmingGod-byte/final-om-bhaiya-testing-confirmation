const chapter6 = {
  id: 6,
  title: "Data Hazards and Forwarding",
  description: "Understanding and resolving data dependencies in pipelined processors",
  estimatedTime: "3 hours",
  completed: false,
  sections: [
    {
      id: "6.1",
      title: "Data Dependencies in Pipelines",
      content: `
        <h3>Understanding Instruction Dependencies</h3>
        <p>Data dependencies between instructions are a major challenge in pipelined processors, potentially causing stalls that reduce performance.</p>
        
        <h4>Types of Data Dependencies</h4>
        <p>There are three fundamental types of data dependencies between instructions:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Dependency Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
          <tr>
            <td><strong>Read After Write (RAW)</strong><br><em>True Dependency</em></td>
            <td>Instruction J tries to read a register that instruction I writes to</td>
            <td>
              add x1, x2, x3<br>
              sub x4, x1, x5  <em>← Reads x1 written by previous instruction</em>
            </td>
          </tr>
          <tr>
            <td><strong>Write After Read (WAR)</strong><br><em>Anti-dependency</em></td>
            <td>Instruction J tries to write to a register that instruction I reads from</td>
            <td>
              add x1, x2, x3  <em>← Reads x2</em><br>
              sub x2, x4, x5  <em>← Writes to x2</em>
            </td>
          </tr>
          <tr>
            <td><strong>Write After Write (WAW)</strong><br><em>Output dependency</em></td>
            <td>Instruction J writes to the same register as instruction I</td>
            <td>
              add x1, x2, x3  <em>← Writes to x1</em><br>
              sub x1, x4, x5  <em>← Also writes to x1</em>
            </td>
          </tr>
        </table>
        
        <p>In a simple in-order pipeline like the classic 5-stage RISC-V pipeline, only RAW hazards cause execution problems, because WAR and WAW hazards don't occur due to the in-order instruction execution and register writes only happening in the last stage.</p>
        
        <h4>Dependency Distance</h4>
        <p>The impact of a dependency depends on how close the dependent instructions are:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/RVfZ7Lt.png" alt="Dependency Distances" style="max-width: 700px; width: 100%;">
          <p><em>Different types of RAW dependencies based on distance</em></p>
        </div>
        
        <ul>
          <li><strong>Back-to-Back Dependency</strong>: Most severe, as the result is needed immediately in the next instruction</li>
          <li><strong>One Instruction Gap</strong>: Still problematic, but potentially less impactful</li>
          <li><strong>Multiple Instruction Gap</strong>: May not cause a hazard if the gap is large enough</li>
        </ul>
        
        <h4>Dependency Analysis</h4>
        <p>A common technique for visualizing and analyzing instruction dependencies is a dependency graph:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/7Uh9qXj.png" alt="Dependency Graph" style="max-width: 500px; width: 100%;">
          <p><em>Example dependency graph for a sequence of instructions</em></p>
        </div>
        
        <p>In this graph:</p>
        <ul>
          <li>Nodes represent instructions</li>
          <li>Edges represent dependencies between instructions</li>
          <li>Edge labels indicate the register causing the dependency</li>
        </ul>
        
        <p>This visualization helps identify critical paths and potential bottlenecks in the instruction sequence.</p>
      `
    },
    {
      id: "6.2",
      title: "Stalls and Bubbles",
      content: `
        <h3>Handling Dependencies Without Forwarding</h3>
        <p>Without data forwarding, the simplest approach to handle data hazards is to stall the pipeline until the dependency is resolved.</p>
        
        <h4>Pipeline Stalling Mechanism</h4>
        <p>When a data hazard is detected, the pipeline control unit must:</p>
        <ol>
          <li>Freeze the affected instruction and all following instructions</li>
          <li>Allow preceding instructions to continue execution</li>
          <li>Resume normal operation once the hazard is cleared</li>
        </ol>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/bNtxnrU.png" alt="Pipeline Stall" style="max-width: 700px; width: 100%;">
          <p><em>Pipeline stall caused by a RAW hazard</em></p>
        </div>
        
        <h4>Pipeline Bubbles</h4>
        <p>A pipeline bubble is essentially a "no-operation" (NOP) that propagates through the pipeline during a stall:</p>
        <ul>
          <li>Consumes execution resources but performs no useful work</li>
          <li>Necessary to maintain the sequential behavior of the program</li>
          <li>Each bubble represents one cycle of lost performance</li>
        </ul>
        
        <p>Implementation of stalls typically involves:</p>
        <ol>
          <li>Preventing the PC from incrementing</li>
          <li>Preventing the IF/ID register from changing</li>
          <li>Inserting a bubble into the ID/EX register</li>
        </ol>
        
        <h4>Load-Use Hazards</h4>
        <p>A particularly problematic type of RAW hazard is the load-use hazard, where an instruction uses a value that was loaded by the immediately preceding instruction:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr>
            <td><pre>
lw  x1, 0(x2)    # Load value into x1
add x3, x1, x4   # Use value from x1 immediately
            </pre></td>
          </tr>
        </table>
        
        <p>This is particularly challenging because:</p>
        <ul>
          <li>The loaded value isn't available until the MEM stage (cycle 4)</li>
          <li>The ADD instruction needs the value in the EX stage (cycle 3)</li>
          <li>Even with forwarding, this requires at least one pipeline stall</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/cSKTPFj.png" alt="Load-Use Hazard" style="max-width: 700px; width: 100%;">
          <p><em>Pipeline showing a load-use hazard requiring a stall</em></p>
        </div>
        
        <h4>Performance Impact of Stalls</h4>
        <p>The impact of stalls on performance can be significant:</p>
        <ul>
          <li>Each stall adds one cycle to program execution</li>
          <li>Common instruction sequences can have many dependencies</li>
          <li>In a simple in-order pipeline without forwarding, up to 30-40% of cycles might be lost to stalls</li>
        </ul>
        
        <p>This performance penalty is the primary motivation for implementing more sophisticated hazard mitigation techniques like data forwarding.</p>
      `
    },
    {
      id: "6.3",
      title: "Data Forwarding Implementation",
      content: `
        <h3>Bypassing the Pipeline</h3>
        <p>Data forwarding (also called bypassing) is a technique that resolves data hazards by routing data values directly from where they're available to where they're needed, without waiting for them to be written to the register file.</p>
        
        <h4>Forwarding Concept</h4>
        <p>The key insight behind forwarding is that the result of an ALU operation is available at the end of the EX stage, but isn't written to the register file until the WB stage (2 cycles later).</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/Xbpz0Ld.png" alt="Forwarding Paths" style="max-width: 700px; width: 100%;">
          <p><em>Data forwarding paths in a 5-stage pipeline</em></p>
        </div>
        
        <p>Forward paths typically include:</p>
        <ul>
          <li><strong>EX/MEM → EX</strong>: Forward from the output of the EX stage to the input of the EX stage</li>
          <li><strong>MEM/WB → EX</strong>: Forward from the output of the MEM stage to the input of the EX stage</li>
        </ul>
        
        <h4>Forwarding Control Logic</h4>
        <p>Forwarding requires additional control logic to:</p>
        <ol>
          <li>Detect when forwarding is needed by comparing register numbers</li>
          <li>Determine the correct forwarding source when multiple options exist</li>
          <li>Configure multiplexers to select the appropriate data path</li>
        </ol>
        
        <p>The basic conditions for forwarding to the EX stage are:</p>
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
// Forward from EX/MEM pipeline register to first ALU input
if (EX/MEM.RegWrite and (EX/MEM.RegisterRd ≠ 0) and 
    (EX/MEM.RegisterRd = ID/EX.RegisterRs1)) 
    ForwardA = 10

// Forward from MEM/WB pipeline register to first ALU input
else if (MEM/WB.RegWrite and (MEM/WB.RegisterRd ≠ 0) and
         (MEM/WB.RegisterRd = ID/EX.RegisterRs1))
    ForwardA = 01

// Use value from register file
else
    ForwardA = 00</pre>
        
        <p>Similar logic applies for the ForwardB control signal that manages the second ALU input.</p>
        
        <h4>Forwarding Unit Implementation</h4>
        <p>A hardware forwarding unit compares the destination register of instructions in later pipeline stages with the source registers of instructions in earlier stages:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/ZfWJ9jW.png" alt="Forwarding Unit" style="max-width: 600px; width: 100%;">
          <p><em>Simplified diagram of forwarding detection logic</em></p>
        </div>
        
        <p>The forwarding unit needs access to:</p>
        <ul>
          <li>Register numbers from multiple pipeline stages</li>
          <li>Control signals indicating whether registers will be written</li>
          <li>Flags to determine if the instruction produces a valid result to forward</li>
        </ul>
        
        <h4>Load-Use Hazards with Forwarding</h4>
        <p>Even with forwarding, load-use hazards still require a pipeline stall:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Cycle</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
          </tr>
          <tr>
            <td>lw x1, 0(x2)</td>
            <td>IF</td>
            <td>ID</td>
            <td>EX</td>
            <td>MEM</td>
            <td>WB</td>
            <td></td>
          </tr>
          <tr>
            <td>add x3, x1, x4</td>
            <td></td>
            <td>IF</td>
            <td>ID</td>
            <td>stall</td>
            <td>EX</td>
            <td>MEM</td>
          </tr>
        </table>
        
        <p>This occurs because:</p>
        <ul>
          <li>The load instruction doesn't have the data until after the MEM stage</li>
          <li>The dependent instruction needs the data in the EX stage</li>
          <li>Even with forwarding, there's still a timing gap that requires a stall</li>
        </ul>
        
        <p>This is typically handled by a hazard detection unit that identifies load-use dependencies and inserts the necessary stall.</p>
      `
    },
    {
      id: "6.4",
      title: "Advanced Forwarding Techniques",
      content: `
        <h3>Beyond Basic Forwarding</h3>
        <p>While basic forwarding resolves many data hazards, advanced techniques can further optimize pipeline performance.</p>
        
        <h4>Load-to-Use Scheduling</h4>
        <p>Compilers can help reduce the impact of load-use hazards by scheduling code to avoid such dependencies:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr>
            <td><strong>Original Code (stall required)</strong></td>
            <td><strong>Scheduled Code (no stall)</strong></td>
          </tr>
          <tr>
            <td>
              <pre>
lw  x1, 0(x2)
add x3, x1, x4  # Uses x1 → stall
              </pre>
            </td>
            <td>
              <pre>
lw  x1, 0(x2)
add x5, x6, x7  # Independent instruction
add x3, x1, x4  # Uses x1 → no stall
              </pre>
            </td>
          </tr>
        </table>
        
        <p>This technique, known as <strong>instruction scheduling</strong>, can significantly reduce stalls if there are independent instructions available to execute between the load and its use.</p>
        
        <h4>Store Forwarding</h4>
        <p>In addition to forwarding from arithmetic operations, processors often implement forwarding from store to load operations:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr>
            <td>
              <pre>
sw  x1, 0(x2)    # Store value from x1
lw  x3, 0(x2)    # Load from same address
              </pre>
            </td>
          </tr>
        </table>
        
        <p>Store-to-load forwarding requires:</p>
        <ul>
          <li>Detection of memory address matches between store and load instructions</li>
          <li>Forwarding paths from the store data to the load result</li>
          <li>Handling of partial overlaps (e.g., storing a byte and loading a word)</li>
        </ul>
        
        <h4>Speculative Forwarding</h4>
        <p>In complex processors, forwarding may sometimes be speculative:</p>
        <ul>
          <li>The processor might predict that two memory operations reference the same address</li>
          <li>Data is forwarded based on this prediction</li>
          <li>The prediction is verified once addresses are fully calculated</li>
          <li>If incorrect, the pipeline is flushed and execution restarts</li>
        </ul>
        
        <p>This technique trades occasional pipeline flushes for improved performance in the common case.</p>
        
        <h4>Hardware vs. Software Approaches</h4>
        <p>Data hazards can be addressed through hardware and software techniques:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Hardware Approaches</th>
            <th>Software (Compiler) Approaches</th>
          </tr>
          <tr>
            <td>
              <ul>
                <li>Data forwarding with bypass networks</li>
                <li>Stall detection and insertion</li>
                <li>Out-of-order execution</li>
                <li>Register renaming</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Instruction scheduling</li>
                <li>Loop unrolling</li>
                <li>Software pipelining</li>
                <li>Inserting NOPs manually</li>
              </ul>
            </td>
          </tr>
        </table>
        
        <p>Modern processors typically use a combination of hardware and software techniques to achieve the best performance.</p>
        
        <h4>Performance Analysis with Forwarding</h4>
        <p>Forwarding can dramatically improve pipeline performance:</p>
        <ul>
          <li>Most RAW hazards can be resolved without stalls</li>
          <li>Only load-use hazards and some complex operations still require stalls</li>
          <li>In typical code, forwarding can eliminate 60-80% of data hazard stalls</li>
        </ul>
        
        <p>However, forwarding adds complexity:</p>
        <ul>
          <li>Additional multiplexers in the data path</li>
          <li>Complex hazard detection logic</li>
          <li>Increased critical path length, potentially limiting clock frequency</li>
        </ul>
        
        <p>The tradeoff between added hardware complexity and performance improvement is almost always worthwhile in modern processors.</p>
      `
    }
  ],
  examples: [
    {
      id: "example6_1",
      title: "Data Hazard Analysis",
      description: "Analysis of data hazards in a short instruction sequence",
      code: `# Instruction sequence with data dependencies
# Register use shown as (Dest <- Src1, Src2)

1. add x1, x2, x3    # x1 <- x2, x3
2. sub x4, x1, x5    # x4 <- x1, x5  (RAW hazard on x1 from instr 1)
3. and x6, x1, x7    # x6 <- x1, x7  (RAW hazard on x1 from instr 1)
4. or  x1, x6, x8    # x1 <- x6, x8  (RAW hazard on x6 from instr 3)
5. xor x9, x1, x4    # x9 <- x1, x4  (RAW hazard on x1 from instr 4, x4 from instr 2)

# Pipeline execution without forwarding:
#
# Cycle:   1  2  3  4  5  6  7  8  9 10 11 12 13
# add x1   IF ID EX ME WB
# sub x4      IF ID -- -- EX ME WB       (stall 2 cycles waiting for x1)
# and x6         IF ID -- -- -- EX ME WB    (stall 2 cycles waiting for x1)
# or  x1            IF ID -- -- -- -- EX ME WB (stall 3 cycles waiting for x6)
# xor x9               IF ID -- -- -- -- EX ME WB (stall 4 cycles waiting for x1,x4)
#
# Total execution time: 13 cycles (8 stall cycles)

# Pipeline execution with full forwarding:
#
# Cycle:   1  2  3  4  5  6  7  8  9
# add x1   IF ID EX ME WB
# sub x4      IF ID EX ME WB          (forward x1 from EX/MEM to EX)
# and x6         IF ID EX ME WB       (forward x1 from MEM/WB to EX)
# or  x1            IF ID EX ME WB    (forward x6 from EX/MEM to EX)
# xor x9               IF ID EX ME WB (forward x1 from EX/MEM to EX, x4 from MEM/WB to EX)
#
# Total execution time: 9 cycles (0 stall cycles)
# Performance improvement: 4 cycles saved (30.8%)

# Analysis:
# 1. Without forwarding, each RAW dependency causes stalls until the value is written back
# 2. With forwarding, most RAW dependencies can be resolved without stalls
# 3. Dependencies on multiple registers compound the stall cycles in non-forwarding case
# 4. Forwarding from different pipeline stages may be needed (EX/MEM or MEM/WB)`,
      explanation: "This example analyzes a sequence of five RISC-V instructions with multiple data dependencies. It shows how the pipeline execution proceeds both with and without data forwarding. Without forwarding, the processor must stall until each dependency is resolved through the register file, resulting in 8 stall cycles and a total execution time of 13 cycles. With forwarding, the processor can route values directly from where they're produced to where they're needed next, eliminating all stalls and reducing execution time to 9 cycles—a 30.8% improvement. The example also highlights different types of forwarding paths needed, such as forwarding from the EX/MEM pipeline register (for fresh results) and from the MEM/WB register (for older results)."
    },
    {
      id: "example6_2",
      title: "Forwarding Unit Verilog Implementation",
      description: "Verilog implementation of forwarding logic for a RISC-V pipeline",
      code: `module forwarding_unit(
  // Instruction fields from ID/EX pipeline register
  input [4:0] id_ex_rs1,      // First source register
  input [4:0] id_ex_rs2,      // Second source register
  
  // Instruction fields from EX/MEM pipeline register
  input [4:0] ex_mem_rd,      // Destination register
  input ex_mem_reg_write,     // Register write enable
  
  // Instruction fields from MEM/WB pipeline register
  input [4:0] mem_wb_rd,      // Destination register
  input mem_wb_reg_write,     // Register write enable
  
  // Forwarding control outputs
  output reg [1:0] forward_a, // Forwarding control for first ALU input
  output reg [1:0] forward_b  // Forwarding control for second ALU input
);

  // Forwarding control values:
  // 00 = No forwarding (use register file output)
  // 10 = Forward from EX/MEM pipeline register
  // 01 = Forward from MEM/WB pipeline register

  // Forwarding logic for first ALU input (rs1)
  always @(*) begin
    // Default: No forwarding
    forward_a = 2'b00;
    
    // Check for forwarding from EX/MEM (highest priority)
    if (ex_mem_reg_write && 
        (ex_mem_rd != 5'b0) && 
        (ex_mem_rd == id_ex_rs1)) begin
      // Forward from EX/MEM (previous instruction result)
      forward_a = 2'b10;
    end
    // Check for forwarding from MEM/WB
    else if (mem_wb_reg_write && 
             (mem_wb_rd != 5'b0) && 
             (mem_wb_rd == id_ex_rs1)) begin
      // Forward from MEM/WB (two instructions ago)
      forward_a = 2'b01;
    end
  end

  // Forwarding logic for second ALU input (rs2)
  always @(*) begin
    // Default: No forwarding
    forward_b = 2'b00;
    
    // Check for forwarding from EX/MEM (highest priority)
    if (ex_mem_reg_write && 
        (ex_mem_rd != 5'b0) && 
        (ex_mem_rd == id_ex_rs2)) begin
      // Forward from EX/MEM (previous instruction result)
      forward_b = 2'b10;
    end
    // Check for forwarding from MEM/WB
    else if (mem_wb_reg_write && 
             (mem_wb_rd != 5'b0) && 
             (mem_wb_rd == id_ex_rs2)) begin
      // Forward from MEM/WB (two instructions ago)
      forward_b = 2'b01;
    end
  end
endmodule

// Example hazard detection unit for load-use hazards
module hazard_detection_unit(
  // Instruction fields from ID stage
  input [4:0] id_rs1,         // First source register
  input [4:0] id_rs2,         // Second source register
  
  // Instruction fields from EX stage
  input [4:0] ex_rd,          // Destination register
  input ex_mem_read,          // Memory read enable (for loads)
  
  // Hazard control output
  output reg stall            // Pipeline stall signal
);

  always @(*) begin
    // Default: No stall
    stall = 1'b0;
    
    // Check for load-use hazard
    // This occurs when:
    // 1. The instruction in EX stage is a load (ex_mem_read is true)
    // 2. The load destination register matches one of the source
    //    registers of the instruction in ID stage
    // 3. The destination register is not x0
    if (ex_mem_read && 
        ((ex_rd == id_rs1) || (ex_rd == id_rs2)) &&
        (ex_rd != 5'b0)) begin
      stall = 1'b1;  // Insert stall
    end
  end
endmodule`,
      explanation: "This Verilog implementation shows the two key components for handling data hazards in a RISC-V pipeline. The forwarding unit detects when a value needed by the current instruction is available in one of the pipeline registers rather than the register file. It generates control signals (forward_a and forward_b) that control multiplexers at the ALU inputs, allowing the processor to use the most recent value for each register. The forwarding logic checks both the EX/MEM and MEM/WB pipeline registers, prioritizing the more recent value when both contain relevant data. The hazard detection unit specifically handles load-use hazards by detecting when an instruction in the ID stage needs a value that's being loaded by an instruction in the EX stage. Since loads don't have the value until after the MEM stage, the pipeline must stall for one cycle to resolve this dependency, even with forwarding."
    }
  ],
  quiz: {
    title: "Data Hazards and Forwarding Quiz",
    questions: [
      {
        question: "Which of the following is a true data dependency (RAW hazard)?",
        options: [
          "Instruction 1 writes to register x1, Instruction 2 writes to register x1",
          "Instruction 1 reads from register x1, Instruction 2 writes to register x1",
          "Instruction 1 writes to register x1, Instruction 2 reads from register x1",
          "Instruction 1 reads from register x1, Instruction 2 reads from register x1"
        ],
        correctAnswer: 2,
        explanation: "A Read-After-Write (RAW) hazard, or true data dependency, occurs when an instruction writes to a register and a subsequent instruction reads from that same register. This creates a dependency because the second instruction needs the result produced by the first instruction."
      },
      {
        question: "What is the primary benefit of data forwarding in a pipeline?",
        options: [
          "It eliminates all pipeline stalls",
          "It allows the processor to run at a higher clock frequency",
          "It reduces the number of stall cycles needed for data dependencies",
          "It completely eliminates the need for a register file"
        ],
        correctAnswer: 2,
        explanation: "The primary benefit of data forwarding is that it reduces the number of stall cycles needed to handle data dependencies. By routing data directly from where it's produced to where it's needed, most data hazards can be resolved without stalls. However, forwarding cannot eliminate all stalls (e.g., for load-use hazards) and doesn't necessarily allow higher clock frequencies."
      },
      {
        question: "Why does a load-use hazard still require a pipeline stall even with forwarding?",
        options: [
          "The data from a load instruction isn't available until after the MEM stage, but the dependent instruction needs it in the EX stage",
          "The register file can only handle one access at a time",
          "Load instructions take multiple cycles to complete",
          "The ALU can't process data from the memory"
        ],
        correctAnswer: 0,
        explanation: "A load-use hazard requires a stall even with forwarding because of timing: the loaded value isn't available until after the memory access (MEM) stage, but the subsequent instruction needs that value during its execute (EX) stage, which occurs one cycle before the data is available. No amount of forwarding can overcome this timing gap."
      },
      {
        question: "Which pipeline registers are typically involved in data forwarding for a 5-stage RISC-V pipeline?",
        options: [
          "IF/ID and ID/EX",
          "ID/EX and EX/MEM",
          "EX/MEM and MEM/WB",
          "MEM/WB and IF/ID"
        ],
        correctAnswer: 2,
        explanation: "Data forwarding typically involves the EX/MEM and MEM/WB pipeline registers. The EX/MEM register contains the results of the most recently executed instruction, while the MEM/WB register contains results from two instructions ago. These results can be forwarded to the EX stage of the current instruction when dependencies exist."
      },
      {
        question: "What does a pipeline bubble represent?",
        options: [
          "A cycle where multiple instructions complete simultaneously",
          "A cycle where no useful work is done in one or more pipeline stages",
          "A hardware component that monitors data hazards",
          "A buffer that stores temporary results"
        ],
        correctAnswer: 1,
        explanation: "A pipeline bubble represents a cycle where no useful work is done in one or more pipeline stages. It's essentially a 'no-operation' that propagates through the pipeline, consuming resources without producing useful results. Bubbles are inserted to handle hazards and maintain the correct program behavior."
      },
      {
        question: "Which component in a pipelined processor is responsible for detecting when forwarding is needed?",
        options: [
          "The ALU",
          "The register file",
          "The forwarding unit",
          "The PC incrementer"
        ],
        correctAnswer: 2,
        explanation: "The forwarding unit is responsible for detecting when forwarding is needed. It compares the register numbers being read by the current instruction with the destination registers of instructions in later pipeline stages, and generates control signals to route data appropriately when dependencies are found."
      },
      {
        question: "What is a typical compiler technique to reduce load-use hazards?",
        options: [
          "Using fewer variables",
          "Scheduling independent instructions between the load and its use",
          "Using more memory operations",
          "Removing all branches from the code"
        ],
        correctAnswer: 1,
        explanation: "A typical compiler technique to reduce load-use hazards is instruction scheduling, where the compiler identifies independent instructions that can be placed between a load instruction and the instruction that uses the loaded value. This fills the otherwise wasted cycles with useful work, improving overall performance."
      },
      {
        question: "In the context of data forwarding, what does the control signal value '00' typically indicate?",
        options: [
          "Forward from the EX/MEM pipeline register",
          "Forward from the MEM/WB pipeline register",
          "No forwarding needed; use the value from the register file",
          "Stall the pipeline"
        ],
        correctAnswer: 2,
        explanation: "In data forwarding control logic, the value '00' typically indicates that no forwarding is needed, and the processor should use the value read from the register file. Other values like '01' or '10' would indicate forwarding from specific pipeline registers."
      },
      {
        question: "What is store forwarding?",
        options: [
          "Forwarding data from one store instruction to another store instruction",
          "Forwarding data from the processor to memory",
          "Forwarding data from a store instruction to a subsequent load from the same address",
          "Forwarding the memory address calculation"
        ],
        correctAnswer: 2,
        explanation: "Store forwarding refers to forwarding data from a store instruction to a subsequent load instruction that accesses the same memory address. Rather than waiting for the store to write to memory and then reading it back, the processor can forward the data directly from the store to the load, eliminating potential stalls."
      },
      {
        question: "What is the primary challenge in implementing data forwarding in a processor pipeline?",
        options: [
          "Detecting which registers need forwarding and from which pipeline stage",
          "Finding space for the additional pipeline registers",
          "Increasing the size of the register file",
          "Synchronizing the clock to all pipeline stages"
        ],
        correctAnswer: 0,
        explanation: "The primary challenge in implementing data forwarding is correctly detecting which registers need forwarding and from which pipeline stage. This requires comparing register numbers across multiple pipeline stages, handling special cases (like register x0 in RISC-V), and ensuring the correct source is selected when multiple forwarding options exist."
      }
    ]
  }
};

export default chapter6; 