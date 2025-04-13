const chapter4 = {
  id: 4,
  title: "Multi-Cycle Processor Implementation",
  description: "Converting to a multi-cycle design for improved efficiency",
  estimatedTime: "4 hours",
  completed: false,
  sections: [
    {
      id: "4.1",
      title: "Limitations of Single-Cycle Design",
      content: `
        <h3>Why Move Beyond Single-Cycle?</h3>
        <p>While the single-cycle design is elegant in its simplicity, it faces several significant limitations that affect its practical application:</p>
        
        <h4>Performance Constraints</h4>
        <p>In a single-cycle processor, the clock period must accommodate the longest possible instruction path, leading to several inefficiencies:</p>
        <ul>
          <li><strong>Clock Speed Limited by Slowest Instruction</strong>: Memory operations typically have the longest delay, forcing all instructions to run at this slower pace</li>
          <li><strong>Wasted Time for Simple Instructions</strong>: Fast operations like register-to-register arithmetic must wait for the entire clock period</li>
          <li><strong>Limited Throughput</strong>: Even with faster technology, the fundamental limit of one instruction per cycle remains</li>
        </ul>
        
        <h4>Hardware Utilization Issues</h4>
        <p>Single-cycle designs make inefficient use of hardware resources:</p>
        <ul>
          <li><strong>Duplicate Hardware</strong>: Separate instruction and data memories are typically required</li>
          <li><strong>Underutilized Components</strong>: Most components are active for only a fraction of the clock cycle</li>
          <li><strong>Resource Wasting</strong>: The ALU is used only once per instruction, even though multiple operations might be needed</li>
        </ul>
        
        <h4>Power and Area Considerations</h4>
        <p>The inefficiencies translate directly to higher power consumption and larger silicon area:</p>
        <ul>
          <li><strong>Higher Power Usage</strong>: Duplicate hardware and low utilization increase power consumption</li>
          <li><strong>Larger Die Size</strong>: More hardware means more silicon area and higher manufacturing costs</li>
          <li><strong>Thermal Challenges</strong>: Increased power density creates thermal management issues</li>
        </ul>
        
        <p>These limitations motivate the development of more efficient processor architectures, with the multi-cycle design representing a significant improvement while maintaining relative simplicity.</p>
      `
    },
    {
      id: "4.2",
      title: "Multi-Cycle Architecture",
      content: `
        <h3>Multi-Cycle Design Principles</h3>
        <p>A multi-cycle processor breaks down instruction execution into multiple clock cycles, with each cycle performing a specific step in the instruction's execution. This approach addresses many of the single-cycle design's limitations.</p>
        
        <h4>The Instruction Cycle</h4>
        <p>In a multi-cycle RISC-V processor, instructions typically execute in 3-5 clock cycles, depending on the instruction type:</p>
        <ol>
          <li><strong>Fetch</strong>: Retrieve instruction from memory</li>
          <li><strong>Decode</strong>: Decode instruction and read registers</li>
          <li><strong>Execute</strong>: Perform ALU operation or address calculation</li>
          <li><strong>Memory</strong>: Access memory (for load/store instructions)</li>
          <li><strong>Writeback</strong>: Write result to register file</li>
        </ol>
        
        <p>Not all instructions require all five stages. For example, register-register operations skip the memory stage, while store instructions don't need the writeback stage.</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/JYnpTZq.png" alt="Multi-Cycle Instruction Flow" style="max-width: 700px; width: 100%;">
          <p><em>Different instruction types follow different paths through the multi-cycle datapath</em></p>
        </div>
        
        <h4>Shared Resources</h4>
        <p>A key advantage of the multi-cycle design is resource sharing:</p>
        <ul>
          <li><strong>Unified Memory</strong>: A single memory unit can be used for both instructions and data, accessed in different cycles</li>
          <li><strong>Reused ALU</strong>: The ALU can perform different operations in different cycles (address calculation, arithmetic, etc.)</li>
          <li><strong>Shared Buses</strong>: Data paths can be reused across different instruction phases</li>
        </ul>
        
        <h4>Performance Benefits</h4>
        <p>Despite taking multiple cycles per instruction, the multi-cycle design often achieves better overall performance:</p>
        <ul>
          <li><strong>Higher Clock Frequency</strong>: Each cycle performs simpler operations, allowing for a much shorter clock period</li>
          <li><strong>Tailored Execution Time</strong>: Simple instructions complete in fewer cycles than complex ones</li>
          <li><strong>Better Average CPI</strong>: While CPI (Cycles Per Instruction) increases from 1.0, the shorter clock period more than compensates</li>
        </ul>
        
        <p>These characteristics make multi-cycle designs an excellent compromise between performance and complexity, especially for educational purposes and simpler applications.</p>
      `
    },
    {
      id: "4.3",
      title: "Datapath for Multi-Cycle Design",
      content: `
        <h3>Multi-Cycle Datapath Components</h3>
        <p>The multi-cycle datapath expands on the single-cycle design by adding intermediate registers and more flexible routing of data.</p>
        
        <h4>Key Components</h4>
        <ul>
          <li><strong>Program Counter (PC)</strong>: Register holding the address of the current instruction</li>
          <li><strong>Memory</strong>: Combined instruction and data memory (or separate memories with multiplexed access)</li>
          <li><strong>Register File</strong>: Array of 32 general-purpose registers</li>
          <li><strong>ALU</strong>: Performs arithmetic and logical operations</li>
          <li><strong>Control Unit</strong>: State machine that generates control signals based on current state and instruction</li>
        </ul>
        
        <h4>Intermediate Registers</h4>
        <p>Several registers are added to hold intermediate values between cycles:</p>
        <ul>
          <li><strong>Instruction Register (IR)</strong>: Holds the current instruction being executed</li>
          <li><strong>Memory Data Register (MDR)</strong>: Holds data read from memory</li>
          <li><strong>A and B Registers</strong>: Hold values read from the register file</li>
          <li><strong>ALU Output Register</strong>: Holds the result of ALU operations</li>
        </ul>
        
        <p>These registers create "boundaries" between the different stages, allowing operations in different parts of the datapath to occur independently.</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/Mk2cAc1.png" alt="Multi-Cycle Datapath" style="max-width: 700px; width: 100%;">
          <p><em>Simplified multi-cycle datapath showing intermediate registers and multiplexers</em></p>
        </div>
        
        <h4>Multiplexers and Routing</h4>
        <p>The multi-cycle design requires more multiplexers to route data correctly for each cycle:</p>
        <ul>
          <li><strong>ALU Input Multiplexers</strong>: Select between register values, PC, immediate values, or constants</li>
          <li><strong>Memory Address Multiplexer</strong>: Selects between PC (for instruction fetch) and ALU result (for data access)</li>
          <li><strong>Register Write Data Multiplexer</strong>: Selects between ALU result, memory data, and PC+4</li>
        </ul>
        
        <p>These multiplexers allow the same physical components to be used for different purposes in different cycles, increasing hardware utilization.</p>
      `
    },
    {
      id: "4.4",
      title: "Control Unit as a Finite State Machine",
      content: `
        <h3>State Machine Controller</h3>
        <p>The multi-cycle processor's control unit is implemented as a finite state machine (FSM) that progresses through different states for each instruction.</p>
        
        <h4>Basic State Diagram</h4>
        <p>A simplified state diagram for a multi-cycle RISC-V processor typically includes:</p>
        
        <ul>
          <li><strong>Fetch State</strong>: Retrieve instruction from memory (common for all instructions)</li>
          <li><strong>Decode State</strong>: Decode instruction and read registers (common for all instructions)</li>
          <li><strong>Execute States</strong>: Multiple possible states depending on the instruction type:
            <ul>
              <li>Execute-R: For register-register arithmetic/logical operations</li>
              <li>Execute-I: For immediate arithmetic/logical operations</li>
              <li>Execute-Load: For load address calculation</li>
              <li>Execute-Store: For store address calculation</li>
              <li>Execute-Branch: For branch condition evaluation</li>
              <li>Execute-Jump: For jump operations</li>
            </ul>
          </li>
          <li><strong>Memory States</strong>: For memory access operations:
            <ul>
              <li>Memory-Read: For load instructions</li>
              <li>Memory-Write: For store instructions</li>
            </ul>
          </li>
          <li><strong>Writeback States</strong>: For writing results to registers:
            <ul>
              <li>Writeback-R: For register-register operations</li>
              <li>Writeback-I: For immediate operations</li>
              <li>Writeback-Load: For writing loaded data</li>
              <li>Writeback-Jump: For writing return addresses</li>
            </ul>
          </li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/sNqvg0v.png" alt="Multi-Cycle Control FSM" style="max-width: 700px; width: 100%;">
          <p><em>Simplified state diagram for multi-cycle RISC-V control unit</em></p>
        </div>
        
        <h4>State Transitions</h4>
        <p>Transitions between states are determined by:</p>
        <ul>
          <li><strong>Current State</strong>: The current phase of instruction execution</li>
          <li><strong>Instruction Opcode</strong>: Determines which execution path to follow</li>
          <li><strong>Additional Fields</strong>: funct3, funct7 for specific operation selection</li>
        </ul>
        
        <h4>Control Signal Generation</h4>
        <p>In each state, the control unit generates specific control signals to direct datapath operations:</p>
        <ul>
          <li><strong>Fetch State</strong>: PC write enable, memory read, instruction register write</li>
          <li><strong>Decode State</strong>: Register file read, immediate generation</li>
          <li><strong>Execute States</strong>: ALU operation selection, ALU input selection</li>
          <li><strong>Memory States</strong>: Memory read/write enable, memory address selection</li>
          <li><strong>Writeback States</strong>: Register file write enable, write data selection</li>
        </ul>
        
        <p>This structured approach ensures that each component performs the right operation at the right time, while maximizing resource utilization.</p>
      `
    },
    {
      id: "4.5",
      title: "Performance Analysis",
      content: `
        <h3>Evaluating Multi-Cycle Performance</h3>
        <p>To understand the performance benefits of multi-cycle designs, we need to analyze several key metrics.</p>
        
        <h4>Clock Period Reduction</h4>
        <p>The multi-cycle design significantly reduces the clock period compared to single-cycle:</p>
        <ul>
          <li><strong>Single-Cycle Period</strong>: Must accommodate the longest instruction path (typically memory access + ALU + register file)</li>
          <li><strong>Multi-Cycle Period</strong>: Only needs to accommodate the longest individual stage (typically memory access)</li>
          <li><strong>Typical Improvement</strong>: 3-4× shorter clock period, depending on memory and ALU characteristics</li>
        </ul>
        
        <h4>Cycles Per Instruction (CPI)</h4>
        <p>The multi-cycle design has a higher CPI, which varies by instruction:</p>
        <ul>
          <li><strong>Register-Register Operations</strong>: 4 cycles (Fetch, Decode, Execute, Writeback)</li>
          <li><strong>Immediate Operations</strong>: 4 cycles (Fetch, Decode, Execute, Writeback)</li>
          <li><strong>Load Instructions</strong>: 5 cycles (Fetch, Decode, Execute, Memory, Writeback)</li>
          <li><strong>Store Instructions</strong>: 4 cycles (Fetch, Decode, Execute, Memory)</li>
          <li><strong>Branches</strong>: 3 cycles (Fetch, Decode, Execute)</li>
          <li><strong>Jumps</strong>: 3-4 cycles (depending on return address saving)</li>
        </ul>
        
        <p>The average CPI depends on the instruction mix of the program being executed, but typically ranges from 3.5 to 4.5.</p>
        
        <h4>Overall Performance Comparison</h4>
        <p>The key performance equation is:</p>
        <p style="text-align: center;"><strong>Performance = Clock Frequency / Average CPI</strong></p>
        
        <p>Consider this comparison example:</p>
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Design</th>
            <th>Clock Period</th>
            <th>Average CPI</th>
            <th>Time per Instruction</th>
            <th>Relative Performance</th>
          </tr>
          <tr>
            <td>Single-cycle</td>
            <td>10ns</td>
            <td>1.0</td>
            <td>10ns</td>
            <td>1.0×</td>
          </tr>
          <tr>
            <td>Multi-cycle</td>
            <td>3ns</td>
            <td>4.0</td>
            <td>12ns</td>
            <td>0.83×</td>
          </tr>
        </table>
        
        <p>In this example, the multi-cycle design is slightly slower overall. However, with more complex operations or slower memory relative to logic, the multi-cycle design often outperforms the single-cycle approach:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Design</th>
            <th>Clock Period</th>
            <th>Average CPI</th>
            <th>Time per Instruction</th>
            <th>Relative Performance</th>
          </tr>
          <tr>
            <td>Single-cycle</td>
            <td>15ns</td>
            <td>1.0</td>
            <td>15ns</td>
            <td>1.0×</td>
          </tr>
          <tr>
            <td>Multi-cycle</td>
            <td>3ns</td>
            <td>4.0</td>
            <td>12ns</td>
            <td>1.25×</td>
          </tr>
        </table>
        
        <h4>Other Benefits</h4>
        <p>Beyond raw performance, multi-cycle designs offer other advantages:</p>
        <ul>
          <li><strong>Reduced Hardware Cost</strong>: Fewer components needed due to resource sharing</li>
          <li><strong>Lower Power Consumption</strong>: Better hardware utilization and potentially lower voltage operation</li>
          <li><strong>Simpler Memory Interface</strong>: Single memory interface can be optimized</li>
        </ul>
        
        <p>These factors make multi-cycle designs an excellent choice for many embedded applications where cost and power efficiency are important.</p>
      `
    }
  ],
  examples: [
    {
      id: "example4_1",
      title: "Multi-Cycle Control FSM",
      description: "Verilog implementation of a simplified control unit state machine for a multi-cycle RISC-V processor",
      code: `module controller(
  input clk, reset,
  input [6:0] opcode,       // Instruction opcode field
  input [2:0] funct3,       // Instruction funct3 field
  input [6:0] funct7,       // Instruction funct7 field
  input zero,               // Zero flag from ALU
  
  // Control signals
  output reg pc_write,      // Write to PC
  output reg [1:0] pc_src,  // PC source selection
  output reg ir_write,      // Write to Instruction Register
  output reg [1:0] result_src, // Result source selection
  output reg [1:0] alu_src_a, // ALU A input selection
  output reg [1:0] alu_src_b, // ALU B input selection
  output reg [3:0] alu_control, // ALU operation
  output reg mem_write,     // Memory write enable
  output reg reg_write      // Register file write enable
);

  // State definitions
  localparam FETCH   = 4'b0000;
  localparam DECODE  = 4'b0001;
  localparam EXEC_R  = 4'b0010;
  localparam EXEC_I  = 4'b0011;
  localparam EXEC_LD = 4'b0100;
  localparam EXEC_ST = 4'b0101;
  localparam EXEC_BR = 4'b0110;
  localparam EXEC_JAL= 4'b0111;
  localparam MEM_RD  = 4'b1000;
  localparam MEM_WR  = 4'b1001;
  localparam WB_R    = 4'b1010;
  localparam WB_I    = 4'b1011;
  localparam WB_LD   = 4'b1100;
  localparam WB_JAL  = 4'b1101;
  
  // RISC-V opcode definitions
  localparam OP      = 7'b0110011; // R-type
  localparam OP_IMM  = 7'b0010011; // I-type
  localparam LOAD    = 7'b0000011; // Load
  localparam STORE   = 7'b0100011; // Store
  localparam BRANCH  = 7'b1100011; // Branch
  localparam JAL     = 7'b1101111; // Jump and Link
  
  reg [3:0] state, next_state;
  
  // State register
  always @(posedge clk or posedge reset) begin
    if (reset)
      state <= FETCH;
    else
      state <= next_state;
  end
  
  // Next state logic
  always @(*) begin
    case(state)
      FETCH:
        next_state = DECODE;
        
      DECODE: begin
        case(opcode)
          OP:      next_state = EXEC_R;
          OP_IMM:  next_state = EXEC_I;
          LOAD:    next_state = EXEC_LD;
          STORE:   next_state = EXEC_ST;
          BRANCH:  next_state = EXEC_BR;
          JAL:     next_state = EXEC_JAL;
          default: next_state = FETCH; // Return to fetch on invalid opcode
        endcase
      end
      
      EXEC_R:
        next_state = WB_R;
        
      EXEC_I:
        next_state = WB_I;
        
      EXEC_LD:
        next_state = MEM_RD;
        
      EXEC_ST:
        next_state = MEM_WR;
        
      EXEC_BR:
        next_state = FETCH; // Branch decision made, return to fetch
        
      EXEC_JAL:
        next_state = WB_JAL;
        
      MEM_RD:
        next_state = WB_LD;
        
      MEM_WR:
        next_state = FETCH; // Store complete, return to fetch
        
      WB_R, WB_I, WB_LD, WB_JAL:
        next_state = FETCH; // Writeback complete, return to fetch
        
      default:
        next_state = FETCH; // Failsafe return to fetch
    endcase
  end
  
  // Output logic - simplified for brevity
  always @(*) begin
    // Default control signal values
    pc_write = 1'b0;
    pc_src = 2'b00;
    ir_write = 1'b0;
    result_src = 2'b00;
    alu_src_a = 2'b00;
    alu_src_b = 2'b00;
    alu_control = 4'b0000;
    mem_write = 1'b0;
    reg_write = 1'b0;
    
    case(state)
      FETCH: begin
        // PC -> Mem, IR <- Mem
        pc_write = 1'b1;
        pc_src = 2'b00;    // PC + 4
        ir_write = 1'b1;
      end
      
      DECODE: begin
        // Read registers, prepare immediates
        alu_src_a = 2'b01; // PC
        alu_src_b = 2'b10; // 4
        alu_control = 4'b0000; // ADD
      end
      
      EXEC_R: begin
        // Reg[rs1] op Reg[rs2]
        alu_src_a = 2'b10; // Register A
        alu_src_b = 2'b00; // Register B
        // ALU operation depends on funct3/funct7
        // Full implementation would set alu_control based on these
      end
      
      EXEC_I: begin
        // Reg[rs1] op immediate
        alu_src_a = 2'b10; // Register A
        alu_src_b = 2'b01; // Immediate
        // ALU operation depends on funct3
      end
      
      EXEC_LD, EXEC_ST: begin
        // Address calculation: Reg[rs1] + offset
        alu_src_a = 2'b10; // Register A
        alu_src_b = 2'b01; // Immediate
        alu_control = 4'b0000; // ADD
      end
      
      EXEC_BR: begin
        // Branch condition check
        alu_src_a = 2'b10; // Register A
        alu_src_b = 2'b00; // Register B
        alu_control = 4'b0001; // SUB for comparison
        // Branch taken if condition met
        pc_write = (zero == 1'b1); // Simplified - only BEQ implemented here
        pc_src = 2'b01; // Branch target
      end
      
      EXEC_JAL: begin
        // Jump calculation
        alu_src_a = 2'b01; // PC
        alu_src_b = 2'b01; // Immediate
        alu_control = 4'b0000; // ADD
        pc_write = 1'b1;
        pc_src = 2'b10; // Jump target
      end
      
      MEM_RD: begin
        // Memory read operation
        result_src = 2'b01; // Memory result
      end
      
      MEM_WR: begin
        // Memory write operation
        mem_write = 1'b1;
      end
      
      WB_R, WB_I: begin
        // Register writeback for R/I-type
        reg_write = 1'b1;
        result_src = 2'b00; // ALU result
      end
      
      WB_LD: begin
        // Register writeback for load
        reg_write = 1'b1;
        result_src = 2'b01; // Memory data
      end
      
      WB_JAL: begin
        // Register writeback for JAL
        reg_write = 1'b1;
        result_src = 2'b10; // PC + 4
      end
    endcase
  end
endmodule`,
      explanation: "This Verilog module implements a control unit for a multi-cycle RISC-V processor as a finite state machine. It defines states for fetch, decode, various execute phases, memory operations, and writeback operations. The controller takes the instruction opcode, function fields, and ALU flags as inputs and generates control signals for the datapath components. The state transitions follow the instruction execution flow, with different paths for different instruction types. In each state, specific control signals are set to direct the datapath operations for that phase of instruction execution. Note that this is a simplified implementation, focusing on the basic control flow rather than the complete set of RISC-V instructions."
    },
    {
      id: "example4_2",
      title: "Multi-Cycle Datapath Component",
      description: "Verilog implementation of the ALU and register components for a multi-cycle RISC-V processor",
      code: `// 32-bit Register with enable
module register #(parameter WIDTH = 32) (
  input clk, reset,
  input write_enable,
  input [WIDTH-1:0] data_in,
  output reg [WIDTH-1:0] data_out
);
  always @(posedge clk or posedge reset) begin
    if (reset)
      data_out <= {WIDTH{1'b0}};
    else if (write_enable)
      data_out <= data_in;
  end
endmodule

// Program Counter with enable
module program_counter (
  input clk, reset,
  input pc_write,
  input [31:0] pc_next,
  output reg [31:0] pc
);
  always @(posedge clk or posedge reset) begin
    if (reset)
      pc <= 32'h00000000; // Reset to start address
    else if (pc_write)
      pc <= pc_next;
  end
endmodule

// ALU with multi-cycle support
module alu (
  input [31:0] src_a, src_b,
  input [3:0] alu_control,
  output reg [31:0] alu_result,
  output zero
);
  assign zero = (alu_result == 32'b0);
  
  always @(*) begin
    case (alu_control)
      4'b0000: alu_result = src_a + src_b;           // ADD
      4'b0001: alu_result = src_a - src_b;           // SUB
      4'b0010: alu_result = src_a & src_b;           // AND
      4'b0011: alu_result = src_a | src_b;           // OR
      4'b0100: alu_result = src_a ^ src_b;           // XOR
      4'b0101: alu_result = src_a << src_b[4:0];     // SLL
      4'b0110: alu_result = src_a >> src_b[4:0];     // SRL
      4'b0111: alu_result = $signed(src_a) >>> src_b[4:0]; // SRA
      4'b1000: alu_result = ($signed(src_a) < $signed(src_b)) ? 32'b1 : 32'b0; // SLT
      4'b1001: alu_result = (src_a < src_b) ? 32'b1 : 32'b0; // SLTU
      default: alu_result = 32'b0;
    endcase
  end
endmodule

// Instruction Register
module instruction_register (
  input clk, reset,
  input ir_write,
  input [31:0] instruction_in,
  output reg [31:0] instruction_out
);
  always @(posedge clk or posedge reset) begin
    if (reset)
      instruction_out <= 32'h00000013; // ADDI x0, x0, 0 (NOP)
    else if (ir_write)
      instruction_out <= instruction_in;
  end
endmodule

// 2-to-1 Multiplexer
module mux2 #(parameter WIDTH = 32) (
  input [WIDTH-1:0] d0, d1,
  input select,
  output [WIDTH-1:0] y
);
  assign y = select ? d1 : d0;
endmodule

// 4-to-1 Multiplexer
module mux4 #(parameter WIDTH = 32) (
  input [WIDTH-1:0] d0, d1, d2, d3,
  input [1:0] select,
  output reg [WIDTH-1:0] y
);
  always @(*) begin
    case (select)
      2'b00: y = d0;
      2'b01: y = d1;
      2'b10: y = d2;
      2'b11: y = d3;
    endcase
  end
endmodule`,
      explanation: "This example provides Verilog implementations for several key components of a multi-cycle RISC-V processor datapath. It includes a general-purpose register module with enable control, a program counter with write enable, an ALU supporting multiple operations, an instruction register, and multiplexers for data routing. The register and program counter modules include synchronous reset and enable inputs, essential for the controlled sequential operation of the multi-cycle design. The ALU supports various operations needed for different instruction types and execution phases. The instruction register captures and holds instructions during the multi-cycle execution. Finally, the multiplexers provide the flexible data routing required to reuse components across different execution phases."
    }
  ],
  quiz: {
    title: "Multi-Cycle Processor Implementation Quiz",
    questions: [
      {
        question: "What is the primary advantage of a multi-cycle processor over a single-cycle design?",
        options: [
          "It executes all instructions in a fixed number of cycles",
          "It allows for better hardware utilization by reusing components",
          "It eliminates the need for control signals",
          "It always achieves higher clock frequencies than pipelined designs"
        ],
        correctAnswer: 1,
        explanation: "The primary advantage of a multi-cycle processor is better hardware utilization. By dividing instruction execution into multiple cycles, components like the ALU and memory can be reused for different purposes during different stages of execution, reducing the overall hardware cost and improving efficiency."
      },
      {
        question: "Which type of control unit is typically used in a multi-cycle processor?",
        options: [
          "Combinational logic similar to single-cycle designs",
          "Microcode ROM with lookup tables",
          "Finite state machine (FSM)",
          "Neural network accelerator"
        ],
        correctAnswer: 2,
        explanation: "A multi-cycle processor typically uses a finite state machine (FSM) for its control unit. The FSM tracks the current stage of instruction execution and generates the appropriate control signals for each state, allowing the processor to progress through the different phases of instruction execution."
      },
      {
        question: "What is the typical Cycles Per Instruction (CPI) range for a multi-cycle RISC-V processor?",
        options: [
          "Always exactly 1 cycle per instruction",
          "Between 1 and 2 cycles per instruction",
          "Between 3 and 5 cycles per instruction",
          "Over 10 cycles per instruction"
        ],
        correctAnswer: 2,
        explanation: "A typical multi-cycle RISC-V processor has a CPI range of 3 to 5 cycles per instruction. Different instruction types require different numbers of cycles: register-register operations typically take 4 cycles, load instructions take 5 cycles, and branches take 3 cycles."
      },
      {
        question: "Which additional registers are typically added in a multi-cycle design compared to a single-cycle design?",
        options: [
          "Only the Program Counter register",
          "Intermediate registers like Instruction Register, A/B registers, and ALU Output register",
          "Specialized registers for branch prediction",
          "Additional general-purpose registers (x32-x63)"
        ],
        correctAnswer: 1,
        explanation: "Multi-cycle designs add intermediate registers to hold values between cycles, including the Instruction Register (IR) to hold the current instruction, A and B registers to hold values read from the register file, Memory Data Register (MDR) to hold data read from memory, and ALU Output register to hold ALU results."
      },
      {
        question: "Why can a multi-cycle processor have a shorter clock period than a single-cycle processor?",
        options: [
          "Because it uses faster transistors",
          "Because each cycle performs a simpler operation with a shorter critical path",
          "Because it executes fewer instructions overall",
          "Because it requires less memory"
        ],
        correctAnswer: 1,
        explanation: "A multi-cycle processor can have a shorter clock period because each cycle performs a simpler operation with a shorter critical path. In a single-cycle design, the clock period must accommodate the longest possible instruction path, while in a multi-cycle design, complex operations are broken down into multiple simpler steps."
      },
      {
        question: "Which of the following best describes the relationship between clock period and CPI in determining processor performance?",
        options: [
          "Only clock period matters; CPI is irrelevant",
          "Only CPI matters; clock period is irrelevant",
          "Performance improves with lower CPI and shorter clock period",
          "Performance improves with higher CPI and longer clock period"
        ],
        correctAnswer: 2,
        explanation: "Performance improves with lower CPI (fewer cycles per instruction) and shorter clock period (faster cycles). The overall performance is determined by the time per instruction, which is calculated as CPI × clock period. A design with lower CPI and shorter clock period will execute instructions faster."
      },
      {
        question: "What is the purpose of the Instruction Register (IR) in a multi-cycle design?",
        options: [
          "To generate instructions dynamically",
          "To hold the currently executing instruction throughout its cycles",
          "To predict which instruction will execute next",
          "To store all possible instructions for the processor"
        ],
        correctAnswer: 1,
        explanation: "The Instruction Register (IR) holds the currently executing instruction throughout its multiple execution cycles. It captures the instruction during the fetch phase and keeps it stable while the control unit steps through the various execution phases, even though the processor may fetch a new instruction from memory."
      },
      {
        question: "How does a multi-cycle processor typically handle memory access?",
        options: [
          "It requires separate instruction and data memories",
          "It uses a unified memory accessed in different cycles for instructions and data",
          "It uses cache memory exclusively",
          "It requires no memory access at all"
        ],
        correctAnswer: 1,
        explanation: "A multi-cycle processor typically uses a unified memory that is accessed in different cycles for instructions and data. During the fetch phase, it reads instructions from memory, and during the memory phase (for load/store instructions), it reads or writes data. This resource sharing is one of the key advantages of the multi-cycle design."
      },
      {
        question: "Which instruction typically requires the most cycles in a multi-cycle RISC-V processor?",
        options: [
          "Register-register arithmetic (ADD, SUB, etc.)",
          "Branches (BEQ, BNE, etc.)",
          "Load instructions (LW, LH, etc.)",
          "Jumps (JAL, JALR)"
        ],
        correctAnswer: 2,
        explanation: "Load instructions typically require the most cycles in a multi-cycle RISC-V processor, usually 5 cycles (fetch, decode, execute, memory, writeback). This is because they need to perform address calculation, memory access, and register writeback, utilizing all the major phases of instruction execution."
      },
      {
        question: "What happens during the decode stage of a multi-cycle processor?",
        options: [
          "The processor executes the ALU operation",
          "The processor reads the next instruction from memory",
          "The processor writes results to the register file",
          "The processor interprets the instruction and reads register values"
        ],
        correctAnswer: 3,
        explanation: "During the decode stage, the processor interprets the instruction opcode and other fields to determine what operation to perform, and it reads the necessary values from the register file. This stage prepares the operands and control signals needed for the subsequent execute stage."
      }
    ]
  }
};

export default chapter4; 