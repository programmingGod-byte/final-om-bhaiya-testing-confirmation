const chapter3 = {
  id: 3,
  title: "Single-Cycle Processor Design",
  description: "Implementing a basic single-cycle RISC-V processor",
  estimatedTime: "4 hours",
  completed: false,
  sections: [
    {
      id: "3.1",
      title: "Architectural Overview",
      content: `
        <h3>Single-Cycle RISC-V Architecture</h3>
        <p>A single-cycle processor executes each instruction in one clock cycle, from fetch to completion. This design prioritizes simplicity over performance, making it an excellent starting point for understanding processor implementation.</p>
        
        <h4>Block Diagram of a Single-Cycle RISC-V Processor</h4>
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/8ZJZnSW.png" alt="Single-Cycle RISC-V Processor" style="max-width: 700px; width: 100%;">
          <p><em>Block diagram of a basic single-cycle RISC-V processor</em></p>
        </div>
        
        <h4>Key Components</h4>
        <p>The single-cycle RV32I processor consists of several primary components:</p>
        <ul>
          <li><strong>Program Counter (PC)</strong>: Holds the address of the current instruction</li>
          <li><strong>Instruction Memory</strong>: Stores the program instructions</li>
          <li><strong>Register File</strong>: Contains the 32 general-purpose registers</li>
          <li><strong>ALU (Arithmetic Logic Unit)</strong>: Performs arithmetic and logical operations</li>
          <li><strong>Data Memory</strong>: Stores program data</li>
          <li><strong>Control Unit</strong>: Generates control signals based on instruction opcode</li>
          <li><strong>Immediate Generator</strong>: Extracts and sign-extends immediate values from instructions</li>
        </ul>
        
        <h4>Data Path and Control Path Separation</h4>
        <p>The processor design can be divided into two main parts:</p>
        <ul>
          <li><strong>Data Path</strong>: The hardware components that manipulate data (registers, ALU, memories, multiplexers, etc.)</li>
          <li><strong>Control Path</strong>: The logic that controls the data path components based on the instruction being executed</li>
        </ul>
        
        <p>This separation simplifies design and verification by allowing each path to be developed and tested independently.</p>
        
        <h4>Base ISA Implementation Scope</h4>
        <p>For a basic single-cycle implementation, we typically focus on the RV32I base instruction set, which includes:</p>
        <ul>
          <li>Integer arithmetic and logical operations (ADD, SUB, AND, OR, XOR, etc.)</li>
          <li>Memory access instructions (LW, SW, etc.)</li>
          <li>Control flow instructions (branches and jumps)</li>
          <li>Upper immediate instructions (LUI, AUIPC)</li>
        </ul>
        
        <p>Extensions like M (multiply/divide), F (floating-point), or A (atomic) can be added later as enhancements.</p>
        
        <h4>Implementation Tradeoffs</h4>
        <p>The single-cycle design has important tradeoffs to consider:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
          <tr>
            <td>
              <ul>
                <li>Simple to understand and implement</li>
                <li>No hazard handling required</li>
                <li>Direct correspondence between architecture and implementation</li>
                <li>Lower control complexity</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Clock period limited by slowest instruction</li>
                <li>Poor hardware utilization (components used only once per cycle)</li>
                <li>Limited performance</li>
                <li>Higher power consumption</li>
              </ul>
            </td>
          </tr>
        </table>
        
        <p>Despite its performance limitations, the single-cycle design provides an essential foundation for understanding more complex processor implementations.</p>
      `
    },
    {
      id: "3.2",
      title: "Control Unit Design",
      content: `
        <h3>Control Unit for RISC-V Single-Cycle Processor</h3>
        <p>The control unit is the "brain" of the processor, interpreting instructions and generating control signals that direct the operation of the datapath components.</p>
        
        <h4>Control Signals Generation</h4>
        <p>Based on the instruction opcode (and sometimes funct3/funct7 fields), the control unit generates several critical signals:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Control Signal</th>
            <th>Purpose</th>
            <th>Values</th>
          </tr>
          <tr>
            <td>PC Select</td>
            <td>Controls next PC value</td>
            <td>0: PC+4, 1: Branch/Jump target</td>
          </tr>
          <tr>
            <td>RegWrite</td>
            <td>Enables writing to the register file</td>
            <td>0: No write, 1: Write enabled</td>
          </tr>
          <tr>
            <td>ALUSrc</td>
            <td>Selects second ALU input</td>
            <td>0: Register data, 1: Immediate value</td>
          </tr>
          <tr>
            <td>ALUOp</td>
            <td>Controls ALU operation</td>
            <td>Multiple values for different operations</td>
          </tr>
          <tr>
            <td>MemRead</td>
            <td>Enables reading from data memory</td>
            <td>0: No read, 1: Read enabled</td>
          </tr>
          <tr>
            <td>MemWrite</td>
            <td>Enables writing to data memory</td>
            <td>0: No write, 1: Write enabled</td>
          </tr>
          <tr>
            <td>MemToReg</td>
            <td>Selects register write data source</td>
            <td>0: ALU result, 1: Memory data</td>
          </tr>
          <tr>
            <td>Branch</td>
            <td>Indicates a branch instruction</td>
            <td>0: Not branch, 1: Branch instruction</td>
          </tr>
          <tr>
            <td>Jump</td>
            <td>Indicates a jump instruction</td>
            <td>0: Not jump, 1: Jump instruction</td>
          </tr>
        </table>
        
        <h4>Instruction Decoding Logic</h4>
        <p>The control unit decodes instructions using primarily the opcode field (bits 0-6) and sometimes additional fields like funct3 (bits 12-14) and funct7 (bits 25-31) for R-type instructions.</p>
        
        <p>For example, a load word instruction (LW) would set the following control signals:</p>
        <ul>
          <li>RegWrite = 1 (to store loaded data in register)</li>
          <li>ALUSrc = 1 (to use immediate offset for address calculation)</li>
          <li>MemRead = 1 (to read from memory)</li>
          <li>MemToReg = 1 (to write memory data to register)</li>
          <li>ALUOp = ADD (to calculate memory address)</li>
        </ul>
        
        <h4>Hardwired vs. Microprogrammed Control</h4>
        <p>For a simple RISC-V implementation, hardwired control is typically used because:</p>
        <ul>
          <li>The RISC-V instruction set is relatively simple and regular</li>
          <li>Hardwired control is faster than microprogrammed control</li>
          <li>The control logic can be implemented with simple combinational circuits</li>
        </ul>
        
        <p>Microprogrammed control would be more appropriate for complex instruction sets with irregular encoding or many different instruction behaviors.</p>
        
        <h4>Reset Sequence</h4>
        <p>When the processor is reset, the control unit must ensure:</p>
        <ul>
          <li>The PC is set to the reset vector (typically address 0x00000000)</li>
          <li>All control signals are set to safe default values</li>
          <li>The processor begins executing instructions from the reset address</li>
        </ul>
        
        <p>This initialization is critical for proper processor operation and typically involves an asynchronous reset signal that forces the processor into a known state.</p>
      `
    },
    {
      id: "3.3",
      title: "Datapath Components",
      content: `
        <h3>Key Datapath Components</h3>
        <p>The datapath consists of all the hardware components involved in executing instructions and manipulating data. Let's examine each component in detail.</p>
        
        <h4>Program Counter (PC) and Next PC Logic</h4>
        <p>The Program Counter is a special register that holds the address of the current instruction. The Next PC logic determines the address of the next instruction to fetch.</p>
        
        <ul>
          <li><strong>Default behavior</strong>: PC = PC + 4 (next sequential instruction)</li>
          <li><strong>Branch/Jump behavior</strong>: PC = PC + immediate (for relative branches/jumps) or PC = {PC[31:12], immediate[11:0]} (for JALR)</li>
          <li><strong>Implementation</strong>: Typically uses a multiplexer controlled by branch/jump signals from the control unit</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/BYb9FbK.png" alt="Next PC Logic" style="max-width: 500px; width: 100%;">
          <p><em>Simplified Next PC Logic with multiplexer</em></p>
        </div>
        
        <h4>Register File Design</h4>
        <p>The register file contains the processor's 32 general-purpose registers and provides read/write access to them.</p>
        
        <ul>
          <li><strong>Structure</strong>: 32 registers (x0-x31), each 32 bits wide (for RV32I)</li>
          <li><strong>Ports</strong>: Two read ports and one write port (read ports asynchronous, write port synchronous)</li>
          <li><strong>Special case</strong>: Register x0 is hardwired to zero; writes to x0 are ignored</li>
          <li><strong>Timing</strong>: Writes occur on the rising edge of the clock when RegWrite is active</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/MjVh2cz.png" alt="Register File" style="max-width: 500px; width: 100%;">
          <p><em>32-register file with dual read ports and single write port</em></p>
        </div>
        
        <h4>ALU Implementation</h4>
        <p>The Arithmetic Logic Unit performs all the arithmetic and logical operations required by the instruction set.</p>
        
        <ul>
          <li><strong>Operations</strong>: ADD, SUB, AND, OR, XOR, SLT, SLTU, SLL, SRL, SRA</li>
          <li><strong>Control</strong>: Operation selected by ALUOp signals from control unit</li>
          <li><strong>Flags</strong>: Zero flag (result == 0) used for branch decisions</li>
          <li><strong>Implementation</strong>: Typically a large multiplexer selecting between various operation units</li>
        </ul>
        
        <h4>Memory Interface</h4>
        <p>The memory interface connects the processor to instruction and data memories.</p>
        
        <ul>
          <li><strong>Instruction Memory</strong>: Read-only during execution, addressed by the PC</li>
          <li><strong>Data Memory</strong>: Read/write, addressed by ALU result, controlled by MemRead and MemWrite signals</li>
          <li><strong>Alignment</strong>: Handles byte, half-word, and word accesses with appropriate alignment</li>
          <li><strong>Memory Map</strong>: In a simple implementation, instruction and data memories might be separate; in a von Neumann architecture, they would share the same address space</li>
        </ul>
        
        <h4>Immediate Generator</h4>
        <p>The immediate generator extracts immediate values from instructions and sign-extends them to the full register width.</p>
        
        <ul>
          <li><strong>Function</strong>: Extracts immediate bits from different instruction formats (I, S, B, U, J) and sign-extends them</li>
          <li><strong>Implementation</strong>: Primarily multiplexing logic selecting appropriate bits based on instruction format</li>
          <li><strong>Control</strong>: Instruction format determined by opcode</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/FBf0JT1.png" alt="Immediate Generator" style="max-width: 600px; width: 100%;">
          <p><em>Immediate generation for different instruction formats</em></p>
        </div>
      `
    },
    {
      id: "3.4",
      title: "Integration and Testing",
      content: `
        <h3>Building and Testing a Single-Cycle Processor</h3>
        <p>After designing individual components, the next step is integrating them into a complete processor and verifying its functionality.</p>
        
        <h4>Testbench Development</h4>
        <p>A comprehensive testbench is essential for verifying processor functionality:</p>
        
        <ul>
          <li><strong>Clock Generation</strong>: Provides a consistent clock signal to drive the processor</li>
          <li><strong>Reset Logic</strong>: Initializes the processor to a known state</li>
          <li><strong>Memory Models</strong>: Simulates instruction and data memories</li>
          <li><strong>Instruction Loading</strong>: Pre-loads test programs into instruction memory</li>
          <li><strong>Monitoring</strong>: Observes processor state (PC, register values, memory contents) during execution</li>
          <li><strong>Assertions</strong>: Verifies correct behavior after executing test instructions</li>
        </ul>
        
        <h4>Instruction Testing Strategy</h4>
        <p>A systematic approach to testing ensures complete coverage:</p>
        
        <ol>
          <li><strong>Individual Instruction Tests</strong>: Test each instruction type in isolation</li>
          <li><strong>Instruction Sequences</strong>: Test common instruction combinations</li>
          <li><strong>Corner Cases</strong>: Test edge conditions (zero results, overflow, etc.)</li>
          <li><strong>Small Programs</strong>: Test complete algorithms (e.g., GCD, factorial)</li>
          <li><strong>Regression Testing</strong>: Run all tests after making changes to ensure nothing breaks</li>
        </ol>
        
        <h4>Waveform Analysis</h4>
        <p>Analyzing signal waveforms is a powerful debugging technique:</p>
        
        <ul>
          <li><strong>Instruction Fetch</strong>: Verify PC updates correctly and correct instructions are fetched</li>
          <li><strong>Decode</strong>: Check control signals match expected values for the instruction</li>
          <li><strong>Execute</strong>: Verify ALU operations produce correct results</li>
          <li><strong>Memory</strong>: Confirm memory reads/writes occur with correct addresses and data</li>
          <li><strong>Writeback</strong>: Verify register file updates properly</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/ZbR2KRr.png" alt="Waveform Analysis" style="max-width: 700px; width: 100%;">
          <p><em>Example waveform showing execution of an ADD instruction</em></p>
        </div>
        
        <h4>Performance Measurement</h4>
        <p>Even for a single-cycle processor, performance metrics are important:</p>
        
        <ul>
          <li><strong>CPI (Cycles Per Instruction)</strong>: Always 1 for single-cycle, but useful as a baseline comparison</li>
          <li><strong>Maximum Clock Frequency</strong>: Determined by the critical path through the processor</li>
          <li><strong>IPC (Instructions Per Cycle)</strong>: Always 1 for single-cycle design</li>
          <li><strong>Overall Performance</strong>: Measured in instructions per second (clock frequency × IPC)</li>
        </ul>
        
        <h4>Common Issues and Debugging</h4>
        <p>Watch for these common problems when debugging your implementation:</p>
        
        <ul>
          <li><strong>Control Signal Errors</strong>: Incorrect signals for specific instructions</li>
          <li><strong>Immediate Generation Issues</strong>: Wrong bit selection for different formats</li>
          <li><strong>Timing Problems</strong>: Missing or incorrect clock or reset connections</li>
          <li><strong>ALU Operation Errors</strong>: Incorrect implementation of specific operations</li>
          <li><strong>Memory Alignment Issues</strong>: Problems with byte/half-word accesses</li>
          <li><strong>Branch/Jump Logic Errors</strong>: Incorrect target address calculation</li>
        </ul>
      `
    }
  ],
  examples: [
    {
      id: "example3_1",
      title: "RISC-V Control Unit Implementation",
      description: "Verilog implementation of a basic control unit for an RV32I single-cycle processor",
      code: `module control_unit(
  input [6:0] opcode,       // Instruction opcode field
  input [2:0] funct3,       // Instruction funct3 field
  input [6:0] funct7,       // Instruction funct7 field
  
  output reg [1:0] pc_sel,  // 00: PC+4, 01: Branch, 10: Jump
  output reg reg_write,     // Register file write enable
  output reg alu_src,       // 0: Register, 1: Immediate
  output reg [3:0] alu_op,  // ALU operation
  output reg mem_read,      // Memory read enable
  output reg mem_write,     // Memory write enable
  output reg [1:0] wb_sel   // 00: ALU result, 01: Memory, 10: PC+4
);

  // RISC-V opcode definitions
  localparam LOAD    = 7'b0000011;
  localparam STORE   = 7'b0100011;
  localparam BRANCH  = 7'b1100011;
  localparam JALR    = 7'b1100111;
  localparam JAL     = 7'b1101111;
  localparam OP_IMM  = 7'b0010011;
  localparam OP      = 7'b0110011;
  localparam LUI     = 7'b0110111;
  localparam AUIPC   = 7'b0010111;
  
  always @(*) begin
    // Default values (NOP behavior)
    pc_sel    = 2'b00;     // PC+4
    reg_write = 1'b0;      // No register write
    alu_src   = 1'b0;      // Use register
    alu_op    = 4'b0000;   // ADD
    mem_read  = 1'b0;      // No memory read
    mem_write = 1'b0;      // No memory write
    wb_sel    = 2'b00;     // ALU result
    
    case(opcode)
      LOAD: begin
        reg_write = 1'b1;  // Enable register write
        alu_src   = 1'b1;  // Use immediate
        alu_op    = 4'b0000; // ADD for address
        mem_read  = 1'b1;  // Enable memory read
        wb_sel    = 2'b01; // Write memory data
      end
      
      STORE: begin
        alu_src   = 1'b1;  // Use immediate
        alu_op    = 4'b0000; // ADD for address
        mem_write = 1'b1;  // Enable memory write
      end
      
      BRANCH: begin
        pc_sel    = 2'b01; // Branch target
        alu_op    = 4'b0001; // SUB for comparison
        // Note: Branch taken depends on ALU zero flag and specific branch type
      end
      
      JAL: begin
        pc_sel    = 2'b10; // Jump target
        reg_write = 1'b1;  // Write return address
        wb_sel    = 2'b10; // PC+4
      end
      
      JALR: begin
        pc_sel    = 2'b10; // Jump target
        reg_write = 1'b1;  // Write return address
        alu_src   = 1'b1;  // Use immediate
        alu_op    = 4'b0000; // ADD for address
        wb_sel    = 2'b10; // PC+4
      end
      
      OP_IMM: begin
        reg_write = 1'b1;  // Enable register write
        alu_src   = 1'b1;  // Use immediate
        
        // Select ALU operation based on funct3
        case(funct3)
          3'b000: alu_op = 4'b0000; // ADDI
          3'b010: alu_op = 4'b0010; // SLTI
          3'b011: alu_op = 4'b0011; // SLTIU
          3'b100: alu_op = 4'b0100; // XORI
          3'b110: alu_op = 4'b0110; // ORI
          3'b111: alu_op = 4'b0111; // ANDI
          3'b001: alu_op = 4'b0001; // SLLI
          3'b101: begin
            if (funct7[5]) alu_op = 4'b1101; // SRAI
            else alu_op = 4'b0101; // SRLI
          end
        endcase
      end
      
      OP: begin
        reg_write = 1'b1;  // Enable register write
        
        // Select ALU operation based on funct3 and funct7
        case(funct3)
          3'b000: begin
            if (funct7[5]) alu_op = 4'b0001; // SUB
            else alu_op = 4'b0000; // ADD
          end
          3'b001: alu_op = 4'b0001; // SLL
          3'b010: alu_op = 4'b0010; // SLT
          3'b011: alu_op = 4'b0011; // SLTU
          3'b100: alu_op = 4'b0100; // XOR
          3'b101: begin
            if (funct7[5]) alu_op = 4'b1101; // SRA
            else alu_op = 4'b0101; // SRL
          end
          3'b110: alu_op = 4'b0110; // OR
          3'b111: alu_op = 4'b0111; // AND
        endcase
      end
      
      LUI: begin
        reg_write = 1'b1;  // Enable register write
        alu_src   = 1'b1;  // Use immediate
        alu_op    = 4'b1010; // Pass immediate
      end
      
      AUIPC: begin
        reg_write = 1'b1;  // Enable register write
        alu_src   = 1'b1;  // Use immediate
        alu_op    = 4'b1011; // PC + immediate
      end
    endcase
  end
endmodule`,
      explanation: "This control unit takes the opcode, funct3, and funct7 fields from the instruction and generates control signals for the datapath. It uses a case statement to decode the opcode and determine the appropriate control signals for each instruction type. For R-type and I-type instructions, it further decodes the funct3 and funct7 fields to determine the specific ALU operation. The control signals direct the datapath to perform the correct operations for each instruction type, such as register writes, memory accesses, ALU operations, and next PC selection."
    },
    {
      id: "example3_2",
      title: "RISC-V ALU Implementation",
      description: "Verilog implementation of an ALU for RV32I instructions",
      code: `module alu(
  input [31:0] a,           // First operand
  input [31:0] b,           // Second operand
  input [3:0] alu_op,       // ALU operation
  output reg [31:0] result, // Result
  output zero               // Zero flag
);

  // ALU operation codes
  localparam ADD  = 4'b0000;
  localparam SUB  = 4'b0001;
  localparam SLL  = 4'b0001;
  localparam SLT  = 4'b0010;
  localparam SLTU = 4'b0011;
  localparam XOR  = 4'b0100;
  localparam SRL  = 4'b0101;
  localparam SRA  = 4'b1101;
  localparam OR   = 4'b0110;
  localparam AND  = 4'b0111;
  localparam LUI  = 4'b1010;
  
  // Zero flag is set when result is 0
  assign zero = (result == 32'b0);
  
  always @(*) begin
    case(alu_op)
      ADD:  result = a + b;
      SUB:  result = a - b;
      SLL:  result = a << b[4:0];
      SLT:  result = ($signed(a) < $signed(b)) ? 32'b1 : 32'b0;
      SLTU: result = (a < b) ? 32'b1 : 32'b0;
      XOR:  result = a ^ b;
      SRL:  result = a >> b[4:0];
      SRA:  result = $signed(a) >>> b[4:0];
      OR:   result = a | b;
      AND:  result = a & b;
      LUI:  result = b;      // Pass immediate directly for LUI
      default: result = 32'b0;
    endcase
  end
endmodule`,
      explanation: "This ALU module implements all the arithmetic and logical operations required by the RV32I instruction set. It takes two 32-bit operands and a 4-bit operation code, and produces a 32-bit result and a zero flag. The operation code determines which operation to perform, such as addition, subtraction, logical AND/OR/XOR, shifts, or comparisons. The zero flag is set when the result is zero, which is used for branch instructions. Note that shift operations only use the lower 5 bits of the second operand as the shift amount, as specified in the RISC-V instruction set."
    }
  ],
  quiz: {
    title: "Single-Cycle Processor Design Quiz",
    questions: [
      {
        question: "What is the defining characteristic of a single-cycle processor?",
        options: [
          "It can execute multiple instructions at once",
          "Each instruction takes exactly one clock cycle to complete",
          "It uses a pipeline to overlap instruction execution",
          "It requires minimal hardware resources"
        ],
        correctAnswer: 1,
        explanation: "The defining characteristic of a single-cycle processor is that each instruction, regardless of complexity, completes in exactly one clock cycle. This simplifies the control logic but limits performance, as the clock period must accommodate the longest possible instruction path."
      },
      {
        question: "Which component generates the control signals that direct the datapath's operation?",
        options: [
          "ALU",
          "Register File",
          "Control Unit",
          "Program Counter"
        ],
        correctAnswer: 2,
        explanation: "The Control Unit generates all the control signals that direct the operation of the datapath components. It interprets the instruction opcode and other fields to determine which operations should be performed by each component in the datapath."
      },
      {
        question: "What determines the maximum clock frequency of a single-cycle processor?",
        options: [
          "The number of registers in the register file",
          "The width of the data bus",
          "The propagation delay through the longest instruction path",
          "The size of the instruction memory"
        ],
        correctAnswer: 2,
        explanation: "The maximum clock frequency of a single-cycle processor is determined by the propagation delay through the longest instruction path (critical path). Since all instructions must complete in one cycle, the clock period must be long enough to accommodate the slowest instruction."
      },
      {
        question: "In a RISC-V processor, what is the purpose of the immediate generator?",
        options: [
          "To create random values for testing",
          "To extract and sign-extend immediate values from instructions",
          "To generate intermediate results during multi-cycle operations",
          "To create memory addresses for load/store operations"
        ],
        correctAnswer: 1,
        explanation: "The immediate generator extracts immediate values from various instruction formats (I, S, B, U, J) and sign-extends them to 32 bits so they can be used as operands for ALU operations, memory addresses, or branch/jump targets."
      },
      {
        question: "What does the PC (Program Counter) register contain?",
        options: [
          "The address of the current instruction being executed",
          "The number of instructions executed so far",
          "The operation code of the current instruction",
          "A count of remaining instructions in the program"
        ],
        correctAnswer: 0,
        explanation: "The Program Counter (PC) register contains the memory address of the current instruction being executed. It is updated to point to the next instruction (PC+4) or to a branch/jump target address after each instruction execution."
      },
      {
        question: "Which control signal determines whether the ALU's second input comes from a register or an immediate value?",
        options: [
          "RegWrite",
          "MemToReg",
          "ALUSrc",
          "PCSrc"
        ],
        correctAnswer: 2,
        explanation: "The ALUSrc control signal determines the source of the ALU's second input. When ALUSrc=0, the second input comes from a register (rs2). When ALUSrc=1, the second input comes from the immediate generator."
      },
      {
        question: "What is the main disadvantage of a single-cycle processor architecture?",
        options: [
          "It cannot execute branch instructions",
          "It requires more complex control logic",
          "The clock period is limited by the slowest instruction",
          "It cannot support floating-point operations"
        ],
        correctAnswer: 2,
        explanation: "The main disadvantage of a single-cycle processor is that the clock period is limited by the slowest instruction's execution time. Since all instructions must complete in one cycle, the clock frequency is determined by the longest possible path through the processor, which leads to inefficient hardware utilization for simpler instructions."
      },
      {
        question: "How many read ports does a typical RISC-V register file have?",
        options: [
          "One",
          "Two",
          "Three",
          "Four"
        ],
        correctAnswer: 1,
        explanation: "A typical RISC-V register file has two read ports, allowing it to read two register values simultaneously (rs1 and rs2) for instructions that require two source operands, such as R-type arithmetic instructions."
      },
      {
        question: "Which of the following is a key advantage of hardwired control compared to microprogrammed control for a RISC-V processor?",
        options: [
          "Easier to modify and update",
          "Supports more complex instructions",
          "Faster operation with less overhead",
          "Requires less silicon area"
        ],
        correctAnswer: 2,
        explanation: "A key advantage of hardwired control for RISC-V processors is faster operation with less overhead. Since the RISC-V instruction set is relatively simple and regular, hardwired control can be implemented efficiently with combinational logic, avoiding the extra cycles and complexity of microprogrammed control."
      },
      {
        question: "What happens when register x0 is used as a destination register in RISC-V?",
        options: [
          "The processor raises an exception",
          "The data is written to register x0 normally",
          "The write is ignored because x0 is hardwired to zero",
          "The data is written to the next available register"
        ],
        correctAnswer: 2,
        explanation: "In RISC-V, register x0 is hardwired to the value zero. Any attempt to write to x0 is ignored; the write operation may occur but has no effect, as x0 will continue to read as zero. This feature is useful for implementing operations that don't need to save a result, or for creating more efficient code."
      }
    ]
  }
};

export default chapter3; 