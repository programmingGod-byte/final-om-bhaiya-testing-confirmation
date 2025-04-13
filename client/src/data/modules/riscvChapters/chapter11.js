const chapter11 = {
  id: 11,
  title: "RISC-V Extensions and Customization",
  description: "Exploring the extensible nature of RISC-V and custom instruction set design",
  estimatedTime: "2.5 hours",
  completed: false,
  sections: [
    {
      id: "11.1",
      title: "RISC-V Base ISA and Standard Extensions",
      content: `
        <h3>The Modular RISC-V Architecture</h3>
        <p>RISC-V is designed with modularity in mind, consisting of a small base ISA with optional standard extensions.</p>
        
        <h4>Base ISA Variants</h4>
        <p>RISC-V defines multiple base integer instruction sets:</p>
        <ul>
          <li><strong>RV32I</strong>: 32-bit base integer instruction set</li>
          <li><strong>RV64I</strong>: 64-bit base integer instruction set</li>
          <li><strong>RV128I</strong>: 128-bit base integer instruction set (less common)</li>
        </ul>
        
        <p>Each base ISA provides fundamental integer operations, control flow, and memory access instructions using a fixed-length encoding.</p>
        
        <h4>Standard Extensions</h4>
        <p>RISC-V defines official standard extensions, each identified by a letter:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Extension</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>M</td>
            <td>Integer Multiplication/Division</td>
            <td>Adds integer multiply and divide instructions</td>
          </tr>
          <tr>
            <td>A</td>
            <td>Atomic Instructions</td>
            <td>Adds atomic memory operations for multiprocessor synchronization</td>
          </tr>
          <tr>
            <td>F</td>
            <td>Single-Precision Floating-Point</td>
            <td>Adds 32-bit floating-point instructions</td>
          </tr>
          <tr>
            <td>D</td>
            <td>Double-Precision Floating-Point</td>
            <td>Adds 64-bit floating-point instructions</td>
          </tr>
          <tr>
            <td>C</td>
            <td>Compressed Instructions</td>
            <td>Adds 16-bit instruction encodings for improved code density</td>
          </tr>
          <tr>
            <td>G</td>
            <td>General-Purpose</td>
            <td>Shorthand for the combination of IMAFD</td>
          </tr>
          <tr>
            <td>V</td>
            <td>Vector Operations</td>
            <td>Adds vector processing capabilities</td>
          </tr>
          <tr>
            <td>B</td>
            <td>Bit Manipulation</td>
            <td>Adds bit manipulation operations</td>
          </tr>
        </table>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/Wx2SGZS.png" alt="RISC-V Extension Hierarchy" style="max-width: 700px; width: 100%;">
          <p><em>RISC-V modular ISA with base and extensions</em></p>
        </div>
        
        <h4>Privilege Levels and System Extensions</h4>
        <p>RISC-V defines multiple privilege levels and system extensions:</p>
        <ul>
          <li><strong>Machine Mode (M-mode)</strong>: Highest privilege level, present in all RISC-V implementations</li>
          <li><strong>Supervisor Mode (S-mode)</strong>: For operating systems, includes virtual memory support</li>
          <li><strong>User Mode (U-mode)</strong>: For application programs with the least privileges</li>
        </ul>
        
        <p>Standard profiles combine specific ISA features for different application domains:</p>
        <ul>
          <li><strong>RV32E</strong>: Embedded profile with reduced register set (16 registers)</li>
          <li><strong>RV32GC</strong>: 32-bit general-purpose profile with compressed instructions</li>
          <li><strong>RV64GC</strong>: 64-bit general-purpose profile with compressed instructions</li>
        </ul>
      `
    },
    {
      id: "11.2",
      title: "Vector Extension (RVV)",
      content: `
        <h3>Vector Processing in RISC-V</h3>
        <p>The RISC-V Vector Extension (RVV) provides flexible vector processing capabilities, enabling efficient data-parallel operations.</p>
        
        <h4>Key Concepts</h4>
        <p>RVV introduces a vector programming model with several innovative features:</p>
        <ul>
          <li><strong>Vector Length Agnostic</strong>: Code works regardless of physical vector length</li>
          <li><strong>Configurable Vector Length</strong>: Application can set maximum vector length</li>
          <li><strong>Vector Predication</strong>: Conditional execution using mask registers</li>
          <li><strong>Vector Types</strong>: Support for various element widths (8-bit to 64-bit)</li>
          <li><strong>Masked Operations</strong>: Selective operation on vector elements</li>
        </ul>
        
        <h4>Vector Registers</h4>
        <p>RVV uses a set of vector registers whose size can vary across implementations:</p>
        <ul>
          <li>Vector registers named v0-v31</li>
          <li>Each register can hold multiple elements of various data types</li>
          <li>Configuration registers determine active vector length (vl) and maximum length (vtype)</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/jMhNDVr.png" alt="RISC-V Vector Registers" style="max-width: 650px; width: 100%;">
          <p><em>RISC-V vector register organization with different element widths</em></p>
        </div>
        
        <h4>Example Vector Operations</h4>
        <p>RVV provides various vector arithmetic and memory operations:</p>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
# Vector length configuration
vsetvli t0, a0, e32,m4    # Set vector length based on a0 elements
                         # e32 = 32-bit elements, m4 = using 4 registers per group

# Vector load/store
vle32.v v4, (a1)         # Load vector of 32-bit elements from address in a1
vse32.v v4, (a2)         # Store vector of 32-bit elements to address in a2

# Vector arithmetic
vadd.vv v8, v4, v12      # Vector-vector add
vmul.vx v8, v4, a3       # Vector-scalar multiply

# Masked operations
vsetvli t0, a0, e32,m1   # Set vector length
vmseq.vx v0, v4, zero    # Compare v4 elements with zero, set mask in v0
vadd.vv v8, v4, v12, v0.t # Add only where mask bit is 1</pre>
        
        <h4>Benefits of RISC-V Vectors</h4>
        <p>RVV offers several advantages over traditional SIMD approaches:</p>
        <ul>
          <li><strong>Scalability</strong>: Same code runs on narrow or wide vector implementations</li>
          <li><strong>Binary Compatibility</strong>: Applications run on any RVV implementation</li>
          <li><strong>Reduced Code Size</strong>: No need for multiple specialized paths</li>
          <li><strong>Auto-vectorization</strong>: Compiler-friendly design for automatic parallelization</li>
          <li><strong>Energy Efficiency</strong>: Better performance-per-watt for data-parallel workloads</li>
        </ul>
      `
    },
    {
      id: "11.3",
      title: "Custom Extensions",
      content: `
        <h3>Extending RISC-V with Custom Instructions</h3>
        <p>One of RISC-V's key advantages is the ability to add custom instructions for specialized domains.</p>
        
        <h4>Reserved Opcode Space</h4>
        <p>RISC-V reserves specific opcode spaces for custom extensions:</p>
        <ul>
          <li><strong>Custom-0/1/2/3</strong>: Standard-length (32-bit) custom instruction spaces</li>
          <li><strong>Custom-0.1/1.1</strong>: Compressed (16-bit) custom instruction spaces</li>
        </ul>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
RISC-V 32-bit Instruction Format:
  31        25 24     20 19     15 14  12 11      7 6            0
 +------------+---------+---------+------+---------+-------------+
 | funct7     | rs2     | rs1     |funct3| rd      | opcode      |
 +------------+---------+---------+------+---------+-------------+

Custom Opcodes:
  - 0001011: custom-0 (32-bit)
  - 0101011: custom-1 (32-bit)
  - 1011011: custom-2 (32-bit)
  - 1111011: custom-3 (32-bit)</pre>
        
        <h4>Use Cases for Custom Extensions</h4>
        <p>Custom instructions are valuable for various specialized domains:</p>
        <ul>
          <li><strong>Cryptography</strong>: AES, SHA, public key algorithms</li>
          <li><strong>Digital Signal Processing</strong>: FFT, filters, convolutions</li>
          <li><strong>Machine Learning</strong>: Matrix operations, activation functions, quantization</li>
          <li><strong>Graphics</strong>: Texture mapping, rasterization operations</li>
          <li><strong>Domain-Specific Acceleration</strong>: Genomics, financial modeling</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/sMLDhcS.png" alt="RISC-V Custom Extensions" style="max-width: 650px; width: 100%;">
          <p><em>Adding custom accelerators to a RISC-V core</em></p>
        </div>
        
        <h4>Extension Development Process</h4>
        <p>Developing a custom extension involves several steps:</p>
        <ol>
          <li>Identify computational bottlenecks in the target application</li>
          <li>Define new instructions that can accelerate these operations</li>
          <li>Design instruction encoding within the reserved opcode space</li>
          <li>Implement hardware support in RTL (typically in Verilog or VHDL)</li>
          <li>Extend assembler/compiler toolchain for the new instructions</li>
          <li>Create intrinsics or compiler directives for software access</li>
        </ol>
        
        <h4>Custom Extension Example: Cryptography</h4>
        <p>Example of custom instructions for AES encryption:</p>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
# RISC-V AES custom instruction example
.macro aes_encrypt rd, rs1, rs2
  .insn r CUSTOM_0, 0, 0x01, \rd, \rs1, \rs2
.endm

# Usage in assembly:
aes_encrypt a0, a1, a2   # a0 = AES encrypt block in a1 using key in a2

# Hardware implementation (pseudocode):
when opcode is CUSTOM_0 and funct7 is 0x01:
  perform AES encryption on rs1 using key in rs2
  place result in rd</pre>
      `
    },
    {
      id: "11.4",
      title: "Designing Domain-Specific RISC-V Processors",
      content: `
        <h3>Tailoring RISC-V for Specific Applications</h3>
        <p>The extensibility of RISC-V allows designing highly optimized processors for specific domains.</p>
        
        <h4>Design Methodology</h4>
        <p>Creating a domain-specific RISC-V processor involves:</p>
        <ol>
          <li><strong>Domain Analysis</strong>: Understand computational patterns and requirements</li>
          <li><strong>Extension Selection</strong>: Choose appropriate standard extensions</li>
          <li><strong>Custom Extension Design</strong>: Develop application-specific instructions</li>
          <li><strong>Microarchitecture Optimization</strong>: Tune pipeline, caches, etc.</li>
          <li><strong>Verification</strong>: Ensure correctness with domain-specific workloads</li>
          <li><strong>Software Ecosystem</strong>: Develop libraries, compilers, and tools</li>
        </ol>
        
        <h4>Balancing Specialization and Generality</h4>
        <p>Key considerations when designing a domain-specific processor:</p>
        <ul>
          <li><strong>Performance vs. Flexibility</strong>: More specialization may reduce general-purpose capabilities</li>
          <li><strong>Area and Power Constraints</strong>: Custom logic increases silicon area and potentially power</li>
          <li><strong>Development Cost</strong>: Custom extensions require additional verification and toolchain support</li>
          <li><strong>Backward Compatibility</strong>: Maintaining compatibility with existing RISC-V software</li>
        </ul>
        
        <h4>Case Study: AI and Machine Learning</h4>
        <p>A RISC-V processor optimized for machine learning might include:</p>
        <ul>
          <li>Standard extensions: RV64GCV (base, compression, vector)</li>
          <li>Custom matrix multiplication instructions</li>
          <li>Specialized activation function units</li>
          <li>Quantization/dequantization support</li>
          <li>Tensor addressing modes</li>
          <li>Scratchpad memories for activations and weights</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/RJTqlvw.png" alt="Domain-Specific RISC-V" style="max-width: 700px; width: 100%;">
          <p><em>Architecture of a RISC-V processor with ML-specific extensions</em></p>
        </div>
        
        <h4>Hardware/Software Co-design</h4>
        <p>Effective domain-specific processors require tight integration between hardware and software:</p>
        <ul>
          <li><strong>Compiler Support</strong>: Auto-vectorization, specialized intrinsics</li>
          <li><strong>Libraries</strong>: Domain-specific functions leveraging custom instructions</li>
          <li><strong>Programming Models</strong>: Domain-appropriate abstractions</li>
          <li><strong>Profiling and Tuning</strong>: Tools for analyzing performance on custom hardware</li>
        </ul>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
// Example C code using compiler intrinsics for a machine learning RISC-V extension

// Matrix multiplication with custom instruction
void matrix_multiply(float *C, float *A, float *B, int M, int N, int K) {
  for (int i = 0; i < M; i++) {
    for (int j = 0; j < N; j++) {
      float sum = 0.0f;
      
      // Use custom instruction for dot product of rows and columns
      // Regular code for comparison:
      // for (int k = 0; k < K; k++) {
      //   sum += A[i*K + k] * B[k*N + j];
      // }
      
      // Using custom extension via intrinsic:
      sum = __builtin_riscv_dot_product(&A[i*K], &B[j], N, K);
      
      C[i*N + j] = sum;
    }
  }
}</pre>
      `
    }
  ],
  examples: [
    {
      id: "example11_1",
      title: "Vector Processing with RVV",
      description: "Implementing a vector addition kernel using RISC-V Vector Extension",
      code: `// Vector addition kernel in C and RISC-V assembly with RVV
// C function: void vadd(float* a, float* b, float* c, size_t n)
// RISC-V RVV implementation

// C/C++ function with RVV intrinsics
#include <riscv_vector.h>

void vadd_intrinsics(float* a, float* b, float* c, size_t n) {
  size_t vl;
  for (size_t i = 0; i < n; i += vl) {
    // Set vector length based on remaining elements
    vl = __riscv_vsetvl_e32m8(n - i);
    
    // Load vectors from a and b
    vfloat32m8_t va = __riscv_vle32_v_f32m8(a + i, vl);
    vfloat32m8_t vb = __riscv_vle32_v_f32m8(b + i, vl);
    
    // Add vectors
    vfloat32m8_t vc = __riscv_vfadd_vv_f32m8(va, vb, vl);
    
    // Store result to c
    __riscv_vse32_v_f32m8(c + i, vc, vl);
  }
}

// Pure RISC-V assembly implementation
// a0 = pointer to a
// a1 = pointer to b
// a2 = pointer to c
// a3 = n (number of elements)

vadd:
    mv t0, a3            # t0 = n
    li t1, 0             # t1 = i = 0
    
loop:
    beq t1, t0, done     # if i >= n, exit loop
    sub t2, t0, t1       # t2 = n - i
    
    # Configure vector unit for maximum efficiency
    # e32 = 32-bit elements, m8 = use 8 registers per group
    vsetvli t3, t2, e32, m8  # t3 = vl (vector length for this iteration)
    
    # Calculate addresses
    slli t4, t1, 2       # t4 = i * 4 (size of float)
    add t5, a0, t4       # t5 = &a[i]
    add t6, a1, t4       # t6 = &b[i]
    add t4, a2, t4       # t4 = &c[i]
    
    # Vector load from memory
    vle32.v v8, (t5)     # v8 = a[i:i+vl-1]
    vle32.v v16, (t6)    # v16 = b[i:i+vl-1]
    
    # Vector add
    vfadd.vv v24, v8, v16  # v24 = v8 + v16
    
    # Vector store to memory
    vse32.v v24, (t4)    # c[i:i+vl-1] = v24
    
    # Update loop counter
    add t1, t1, t3       # i += vl
    j loop
    
done:
    ret

// Key features demonstrated:
// 1. Vector-length agnostic (VLA) programming
// 2. Auto-vectorization with strip mining
// 3. Configurable vector length with vsetvli
// 4. Vector load/store operations
// 5. Vector floating-point arithmetic`,
      explanation: "This example demonstrates vector processing using the RISC-V Vector Extension (RVV). It implements a simple vector addition function that computes C = A + B for arrays of floating-point values. The implementation is shown both using C with vector intrinsics and in pure RISC-V assembly language. The code illustrates key features of RVV, including vector-length agnostic programming, where the same code works regardless of the hardware's vector register width. The vsetvli instruction configures the vector unit for the current iteration, handling the remaining elements in the array. This approach automatically handles the 'strip mining' loop pattern required for vector processing. The example also shows vector load (vle32.v), vector arithmetic (vfadd.vv), and vector store (vse32.v) operations. This vector implementation can achieve significant speedups over scalar code by processing multiple elements in parallel."
    },
    {
      id: "example11_2",
      title: "Custom Extension for AES Encryption",
      description: "Designing and implementing custom instructions for AES encryption",
      code: `// Custom RISC-V extension for AES encryption
// This example demonstrates both the hardware design and software use

// 1. Instruction Definition
// New custom instructions using the custom-0 opcode space (0001011)
// aes.enc rd, rs1, rs2    # AES encrypt round: rd = AES_Round(rs1, rs2)
// aes.dec rd, rs1, rs2    # AES decrypt round: rd = AES_Inv_Round(rs1, rs2)
// aes.keyexp rd, rs1, imm # AES key expansion: rd = KeyExpansion(rs1, imm)

// 2. Hardware Implementation (Verilog pseudocode)
module aes_extension(
  input         clock,
  input         reset,
  input  [31:0] instruction,
  input  [31:0] rs1_data,
  input  [31:0] rs2_data,
  output [31:0] rd_data,
  output        busy
);
  // Instruction decode
  wire is_aes_instr = (instruction[6:0] == 7'b0001011);
  wire [2:0] funct3 = instruction[14:12];
  
  // Instruction variants
  wire is_aes_enc = is_aes_instr && (funct3 == 3'b000);
  wire is_aes_dec = is_aes_instr && (funct3 == 3'b001);
  wire is_aes_keyexp = is_aes_instr && (funct3 == 3'b010);
  
  // AES state and key registers
  reg [127:0] aes_state;
  reg [127:0] aes_key;
  
  // AES hardware modules (simplified)
  wire [127:0] enc_result = aes_encrypt_round(aes_state, aes_key);
  wire [127:0] dec_result = aes_decrypt_round(aes_state, aes_key);
  wire [127:0] keyexp_result = aes_key_expansion(aes_key, rs2_data[7:0]);
  
  // Result selection
  assign rd_data = is_aes_enc ? enc_result[31:0] :
                  is_aes_dec ? dec_result[31:0] :
                  is_aes_keyexp ? keyexp_result[31:0] :
                  32'h0;
  
  // Busy signal (encryption takes multiple cycles)
  reg [1:0] cycle_count;
  assign busy = (cycle_count != 0);
  
  // Processing state machine (simplified)
  always @(posedge clock) begin
    if (reset) begin
      cycle_count <= 0;
    end else if (is_aes_instr && cycle_count == 0) begin
      // Start operation
      cycle_count <= 3;
      // Load state and key registers
      aes_state <= {rs1_data, 96'h0}; // Simplified, actual impl would buffer multiple words
      aes_key <= {rs2_data, 96'h0};
    end else if (cycle_count > 0) begin
      cycle_count <= cycle_count - 1;
    end
  end
endmodule

// 3. Software Integration: Assembly

// Assembly macros for the custom instructions
.macro aes_enc rd, rs1, rs2
  .insn r CUSTOM_0, 0, 0, \rd, \rs1, \rs2
.endm

.macro aes_dec rd, rs1, rs2
  .insn r CUSTOM_0, 1, 0, \rd, \rs1, \rs2
.endm

.macro aes_keyexp rd, rs1, imm
  .insn i CUSTOM_0, 2, \rd, \rs1, \imm
.endm

// Assembly code using the custom instructions
aes_encrypt_block:
  // a0 = pointer to 16-byte output buffer
  // a1 = pointer to 16-byte input block
  // a2 = pointer to expanded key (11 round keys for AES-128)
  
  // Load input block
  lw t0, 0(a1)
  lw t1, 4(a1)
  lw t2, 8(a1)
  lw t3, 12(a1)
  
  // Load first round key
  lw t4, 0(a2)
  lw t5, 4(a2)
  lw t6, 8(a2)
  lw a3, 12(a2)
  
  // Initial AddRoundKey
  xor t0, t0, t4
  xor t1, t1, t5
  xor t2, t2, t6
  xor t3, t3, a3
  
  // Process 9 main rounds
  li t4, 9          // Round counter
  addi a2, a2, 16   // Point to next round key
  
encrypt_loop:
  // Execute AES round using custom instruction
  // Simplified - actual implementation would process full 128-bit state
  aes_enc t0, t0, 0(a2)
  aes_enc t1, t1, 4(a2)
  aes_enc t2, t2, 8(a2)
  aes_enc t3, t3, 12(a2)
  
  addi a2, a2, 16   // Point to next round key
  addi t4, t4, -1   // Decrement round counter
  bnez t4, encrypt_loop
  
  // Final round (different from main rounds in AES)
  // Simplified - would use different instruction variant
  aes_enc t0, t0, 0(a2)
  aes_enc t1, t1, 4(a2)
  aes_enc t2, t2, 8(a2)
  aes_enc t3, t3, 12(a2)
  
  // Store result
  sw t0, 0(a0)
  sw t1, 4(a0)
  sw t2, 8(a0)
  sw t3, 12(a0)
  
  ret

// 4. C/C++ Interface with Intrinsics
// Compiler intrinsics to access the custom instructions

#include <stdint.h>

// Intrinsic declarations
static inline uint32_t __aes_enc(uint32_t state, uint32_t key) {
  uint32_t result;
  asm volatile("custom0 %0, %1, %2" : "=r"(result) : "r"(state), "r"(key));
  return result;
}

static inline uint32_t __aes_dec(uint32_t state, uint32_t key) {
  uint32_t result;
  asm volatile("custom0 %0, %1, %2, 0x1" : "=r"(result) : "r"(state), "r"(key));
  return result;
}

// User-friendly C function using the intrinsics
void aes_encrypt_block(uint8_t *output, const uint8_t *input, const uint8_t *key) {
  // Implementation using intrinsics
  // Similar to assembly version but in C
}`,
      explanation: "This example illustrates the design and implementation of custom RISC-V instructions for AES encryption. It shows the complete process from instruction definition to hardware implementation and software integration. The hardware portion demonstrates how to decode and execute custom instructions within the RISC-V custom-0 opcode space, including state machine design for multi-cycle operations. The software portion shows how to use these custom instructions at both the assembly level (with appropriate macros) and C/C++ level (using compiler intrinsics). AES encryption is a perfect candidate for custom instructions as it involves computationally intensive operations like substitution, permutation, and mixing that can be significantly accelerated in hardware. By implementing these operations as custom instructions, an AES-enabled RISC-V processor can achieve much higher encryption performance compared to a software-only implementation. The example demonstrates how RISC-V's extensibility enables domain-specific optimizations while maintaining compatibility with the base ISA."
    }
  ],
  quiz: {
    title: "RISC-V Extensions and Customization Quiz",
    questions: [
      {
        question: "What is the primary advantage of RISC-V's modular approach to extensions?",
        options: [
          "It allows for a smaller compiler implementation",
          "It reduces the cost of silicon manufacturing",
          "It enables processors to include only the features needed for specific applications",
          "It guarantees backward compatibility with all software"
        ],
        correctAnswer: 2,
        explanation: "The primary advantage of RISC-V's modular approach to extensions is that it allows processors to include only the features needed for specific applications. This means implementations can be optimized for different domains (embedded, server, AI, etc.) without carrying unnecessary overhead, while still maintaining compatibility within the ecosystem. This approach helps balance performance, power consumption, and area based on the target application's requirements."
      },
      {
        question: "Which RISC-V standard extension provides atomic memory operations needed for multiprocessor synchronization?",
        options: [
          "The M extension",
          "The A extension",
          "The C extension",
          "The F extension"
        ],
        correctAnswer: 1,
        explanation: "The A extension (Atomic Instructions) provides atomic memory operations needed for multiprocessor synchronization in RISC-V. This extension includes instructions like atomic load-and-add, atomic swap, and load-reserved/store-conditional pairs that are essential for implementing synchronization primitives such as locks, semaphores, and atomic counters in multi-core systems."
      },
      {
        question: "What is the key feature of the RISC-V Vector Extension (RVV) that distinguishes it from fixed-width SIMD architectures?",
        options: [
          "Support for double-precision floating point",
          "Larger number of vector registers",
          "Vector-length agnostic programming model",
          "Ability to process complex numbers"
        ],
        correctAnswer: 2,
        explanation: "The key distinguishing feature of the RISC-V Vector Extension (RVV) is its vector-length agnostic programming model. This means code written for RVV can run unchanged across RISC-V implementations with different vector register widths. The same binary can automatically adapt to the hardware capabilities, processing as many elements as the physical vector length allows per iteration. This is different from fixed-width SIMD architectures like SSE/AVX, where code often needs to be rewritten for different vector widths."
      },
      {
        question: "Which opcode space is specifically reserved in RISC-V for custom extensions?",
        options: [
          "0000000",
          "0001011 (custom-0)",
          "1111111",
          "0110011"
        ],
        correctAnswer: 1,
        explanation: "The opcode 0001011 (custom-0) is specifically reserved in RISC-V for custom extensions, along with custom-1, custom-2, and custom-3. These reserved opcode spaces allow implementers to add application-specific instructions without conflicting with standard RISC-V instructions. This intentional design feature enables the extensibility that makes RISC-V suitable for domain-specific optimizations."
      },
      {
        question: "What does the 'G' in RV64G stand for?",
        options: [
          "Graphics instructions",
          "General-purpose (combination of IMAFD extensions)",
          "Government-approved security features",
          "Gigabit networking support"
        ],
        correctAnswer: 1,
        explanation: "The 'G' in RV64G stands for General-purpose, which is a shorthand notation for the combination of the base integer instruction set (I) plus the standard extensions M (Integer Multiplication/Division), A (Atomic Instructions), F (Single-Precision Floating-Point), and D (Double-Precision Floating-Point). RV64G is a common configuration for general-purpose computing that provides a good balance of features for most applications."
      },
      {
        question: "In the RISC-V Vector Extension, what does the vsetvli instruction do?",
        options: [
          "Sets vector register v0 to a literal immediate value",
          "Configures the vector length and element size for subsequent vector operations",
          "Selects which vector registers are enabled",
          "Initializes the vector unit to a known state"
        ],
        correctAnswer: 1,
        explanation: "The vsetvli instruction in the RISC-V Vector Extension configures the vector length and element size for subsequent vector operations. It takes into account the available hardware resources, the desired element width, and the number of elements to be processed. This instruction is key to the vector-length agnostic programming model, allowing software to adapt to the physical vector length of the hardware while maintaining portability."
      },
      {
        question: "What is the main advantage of designing domain-specific instructions for a RISC-V processor?",
        options: [
          "Lower manufacturing costs",
          "Improved compatibility with existing software",
          "Significantly higher performance and efficiency for specific workloads",
          "Simplified verification process"
        ],
        correctAnswer: 2,
        explanation: "The main advantage of designing domain-specific instructions for a RISC-V processor is significantly higher performance and efficiency for specific workloads. Custom instructions can accelerate critical operations that are frequently used in a particular application domain, such as cryptography, signal processing, or machine learning. These specialized instructions can often achieve orders of magnitude better performance and energy efficiency compared to implementing the same operations using general-purpose instructions."
      },
      {
        question: "Which privilege level is present in all RISC-V implementations?",
        options: [
          "User Mode (U-mode)",
          "Supervisor Mode (S-mode)",
          "Hypervisor Mode (H-mode)",
          "Machine Mode (M-mode)"
        ],
        correctAnswer: 3,
        explanation: "Machine Mode (M-mode) is present in all RISC-V implementations. It is the highest privilege level and provides low-level access to the hardware. Even the simplest RISC-V implementations support M-mode, while other privilege levels like User Mode (U-mode) and Supervisor Mode (S-mode) are optional and typically included based on the intended application of the processor."
      },
      {
        question: "What is the key challenge when developing custom RISC-V extensions?",
        options: [
          "Limited documentation for the base ISA",
          "Balancing specialization with compatibility and maintenance of software tools",
          "High cost of RISC-V licensing",
          "Inability to use standard development tools"
        ],
        correctAnswer: 1,
        explanation: "The key challenge when developing custom RISC-V extensions is balancing specialization with compatibility and maintenance of software tools. While custom extensions can provide significant performance benefits for specific applications, they require updates to the entire toolchain (assembler, compiler, debugger) and can create incompatibilities with standard software. Developers must carefully consider whether the performance benefits justify the additional development and maintenance costs."
      },
      {
        question: "What is the purpose of the RISC-V 'C' extension?",
        options: [
          "Adding support for the C programming language",
          "Improving code density with compressed 16-bit instructions",
          "Implementing cache control instructions",
          "Supporting complex number arithmetic"
        ],
        correctAnswer: 1,
        explanation: "The purpose of the RISC-V 'C' extension is improving code density with compressed 16-bit instructions. This extension provides shorter encodings for common instructions, reducing program size by typically 25-30%. The compressed instructions maintain full compatibility with the base ISA, as each 16-bit instruction has a 32-bit equivalent. This is particularly valuable for embedded systems where memory size and bandwidth are constrained."
      }
    ]
  }
};

export default chapter11; 