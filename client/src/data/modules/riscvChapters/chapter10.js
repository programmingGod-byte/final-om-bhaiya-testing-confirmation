const chapter10 = {
  id: 10,
  title: "Multiprocessor Systems and Cache Coherence",
  description: "Understanding parallel processing architectures and memory consistency challenges",
  estimatedTime: "3 hours",
  completed: false,
  sections: [
    {
      id: "10.1",
      title: "Multiprocessor Architecture Fundamentals",
      content: `
        <h3>Parallel Processing Systems</h3>
        <p>Modern computing increasingly relies on multiprocessor systems to deliver performance improvements as single-core frequency scaling has slowed.</p>
        
        <h4>Parallelism Taxonomy</h4>
        <p>Parallel processing can be classified along several dimensions:</p>
        <ul>
          <li><strong>Instruction-Level Parallelism (ILP)</strong>: Executing multiple instructions simultaneously within a single processor</li>
          <li><strong>Thread-Level Parallelism (TLP)</strong>: Executing multiple threads of control in parallel</li>
          <li><strong>Data-Level Parallelism (DLP)</strong>: Performing the same operation on multiple data elements simultaneously</li>
        </ul>
        
        <h4>Multiprocessor System Architectures</h4>
        <p>Different ways to organize multiprocessor systems include:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Architecture</th>
            <th>Description</th>
            <th>Characteristics</th>
          </tr>
          <tr>
            <td>Symmetric Multiprocessing (SMP)</td>
            <td>Multiple identical processors connected to a shared memory</td>
            <td>
              <ul>
                <li>Uniform memory access (UMA)</li>
                <li>Shared memory bus or interconnect</li>
                <li>Centralized shared memory</li>
                <li>Common in small-scale systems (2-8 cores)</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Non-Uniform Memory Access (NUMA)</td>
            <td>Memory access time depends on memory location relative to processor</td>
            <td>
              <ul>
                <li>Memory physically distributed among processors</li>
                <li>Local memory access faster than remote access</li>
                <li>Interconnection network between nodes</li>
                <li>Better scalability than SMP</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Distributed Memory Systems</td>
            <td>Each processor has its own private memory address space</td>
            <td>
              <ul>
                <li>Communication via message passing</li>
                <li>No hardware-managed cache coherence</li>
                <li>High scalability</li>
                <li>More complex programming model</li>
              </ul>
            </td>
          </tr>
        </table>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/1C40Xpf.png" alt="Multiprocessor Architectures" style="max-width: 700px; width: 100%;">
          <p><em>Comparison of SMP, NUMA, and distributed memory architectures</em></p>
        </div>
        
        <h4>Chip Multiprocessors (CMPs)</h4>
        <p>Modern multicore processors integrate multiple CPU cores onto a single chip:</p>
        <ul>
          <li>Shared last-level cache (LLC) typically connects cores</li>
          <li>Private L1/L2 caches per core</li>
          <li>On-chip interconnect replaces traditional bus</li>
          <li>Integrated memory controllers</li>
        </ul>
        
        <h4>Memory Consistency Models</h4>
        <p>Memory consistency defines the order in which memory operations appear to execute to software:</p>
        <ul>
          <li><strong>Sequential Consistency</strong>: All processors see the same order of memory operations</li>
          <li><strong>Relaxed Consistency</strong>: Hardware can reorder operations for performance</li>
          <li><strong>Release Consistency</strong>: Special synchronization operations enforce ordering</li>
        </ul>
        
        <p>RISC-V defines several memory consistency models:
        <ul>
          <li><strong>RVWMO</strong>: RISC-V Weak Memory Ordering (default)</li>
          <li><strong>RVTSO</strong>: RISC-V Total Store Ordering (optional extension)</li>
        </ul>
        Explicit fence instructions allow software to enforce ordering when needed.</p>
      `
    },
    {
      id: "10.2",
      title: "The Cache Coherence Problem",
      content: `
        <h3>Maintaining Consistent Views of Memory</h3>
        <p>In systems with private caches, multiple copies of the same memory location can exist, creating the potential for inconsistency.</p>
        
        <h4>The Cache Coherence Problem</h4>
        <p>Consider this sequence of operations on two processors sharing memory:</p>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
Initial state: Memory location X contains 0

Processor 1:              Processor 2:
1. Read X (gets 0)        
2. X = X + 1              
3. Write X (now 1)        
                          4. Read X (should get 1)
                          5. X = X + 1
                          6. Write X (should be 2)
</pre>

        <p>If both processors cache X, Processor 2 might read the old value (0) from its cache instead of the updated value (1) from Processor 1, leading to an incorrect final value of 1 instead of 2.</p>
        
        <h4>Coherence vs. Consistency</h4>
        <p>Two related but distinct concepts:</p>
        <ul>
          <li><strong>Cache Coherence</strong>: Ensures that multiple caches provide a consistent view of individual memory locations</li>
          <li><strong>Memory Consistency</strong>: Defines the ordering constraints for memory operations across all locations</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/RMpfjgm.png" alt="Coherence Problem" style="max-width: 650px; width: 100%;">
          <p><em>The cache coherence problem with write-back caches</em></p>
        </div>
        
        <h4>Coherence Requirements</h4>
        <p>A cache coherence protocol must maintain these invariants:</p>
        <ol>
          <li><strong>Single-Writer, Multiple-Reader (SWMR)</strong>: At any time, either multiple processors can have read-only copies, or a single processor can have a writable copy</li>
          <li><strong>Data-Value Invariant</strong>: The value read from a memory location is the last value written to it</li>
        </ol>
        
        <h4>Coherence Protocol Approaches</h4>
        <p>Two main approaches to implementing cache coherence:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Approach</th>
            <th>Description</th>
            <th>Pros and Cons</th>
          </tr>
          <tr>
            <td>Snooping Protocols</td>
            <td>All caches monitor a shared interconnect for relevant transactions</td>
            <td>
              <ul>
                <li>Simpler implementation</li>
                <li>Lower latency for small systems</li>
                <li>Limited scalability due to bandwidth</li>
                <li>Works well with bus-based systems</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Directory-Based Protocols</td>
            <td>Centralized or distributed directory tracks which caches hold copies of each block</td>
            <td>
              <ul>
                <li>Better scalability</li>
                <li>Targeted invalidations reduce bandwidth</li>
                <li>Higher implementation complexity</li>
                <li>Greater coherence latency</li>
              </ul>
            </td>
          </tr>
        </table>
        
        <h4>False Sharing</h4>
        <p>An important performance issue in coherent systems:</p>
        <ul>
          <li>Occurs when different processors access different variables that happen to share the same cache block</li>
          <li>Creates "ping-ponging" of the cache block between processors</li>
          <li>Can significantly degrade performance despite no actual data sharing</li>
          <li>Common in multithreaded programs with poor data layout</li>
        </ul>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
// Example of false sharing in a multithreaded program
struct {
    int counter1;  // Used by Thread 1
    int counter2;  // Used by Thread 2
} counters;

// Thread 1 function          // Thread 2 function
while (true) {                while (true) {
    counters.counter1++;          counters.counter2++;
}                            }

// Both counters likely share a cache line, causing coherence traffic
// despite no logical data sharing between threads</pre>
      `
    },
    {
      id: "10.3",
      title: "Cache Coherence Protocols",
      content: `
        <h3>Protocol Implementation Details</h3>
        <p>Cache coherence protocols use state machines to track the status of each cache block and determine appropriate actions.</p>
        
        <h4>MSI Protocol</h4>
        <p>The simplest coherence protocol with three states:</p>
        <ul>
          <li><strong>Modified (M)</strong>: Block has been modified; cache has the only valid copy</li>
          <li><strong>Shared (S)</strong>: Block is unmodified and may exist in other caches</li>
          <li><strong>Invalid (I)</strong>: Block does not contain valid data</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/JxQJIjW.png" alt="MSI Protocol State Diagram" style="max-width: 600px; width: 100%;">
          <p><em>State transition diagram for the MSI protocol</em></p>
        </div>
        
        <h4>MESI Protocol</h4>
        <p>An extension of MSI that adds an Exclusive state to optimize the common case of single-processor access:</p>
        <ul>
          <li><strong>Modified (M)</strong>: Block has been modified locally</li>
          <li><strong>Exclusive (E)</strong>: Block is unmodified but exists only in this cache</li>
          <li><strong>Shared (S)</strong>: Block is unmodified and may exist in other caches</li>
          <li><strong>Invalid (I)</strong>: Block does not contain valid data</li>
        </ul>
        
        <p>The key advantage of the E state is that it allows silent transitions to M on writes without generating coherence traffic, since the cache knows it has the only copy.</p>
        
        <h4>MOESI Protocol</h4>
        <p>Further extends MESI with an Owned state to reduce unnecessary writebacks:</p>
        <ul>
          <li><strong>Modified (M)</strong>: Block has been modified locally</li>
          <li><strong>Owned (O)</strong>: Block is modified and shared; this cache is responsible for writing back</li>
          <li><strong>Exclusive (E)</strong>: Block is unmodified but exists only in this cache</li>
          <li><strong>Shared (S)</strong>: Block is unmodified and may exist in other caches</li>
          <li><strong>Invalid (I)</strong>: Block does not contain valid data</li>
        </ul>
        
        <h4>Snooping Protocol Implementation</h4>
        <p>In a snooping protocol:</p>
        <ul>
          <li>All cache controllers monitor the shared bus for transactions</li>
          <li>Each controller takes appropriate action based on observed transactions and local state</li>
          <li>Write-invalidate: invalidate all other copies before writing</li>
          <li>Write-update: update all other copies when writing (less common)</li>
        </ul>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Bus Transaction</th>
            <th>Initiating Processor Action</th>
            <th>Snooping Processor Action</th>
          </tr>
          <tr>
            <td>BusRd (Read)</td>
            <td>Issue when reading a block not in cache</td>
            <td>
              <ul>
                <li>If M: Provide data and transition to S</li>
                <li>If E: Provide data and transition to S</li>
                <li>If S: No action</li>
                <li>If I: No action</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>BusRdX (Read Exclusive)</td>
            <td>Issue when writing to a block not in M/E state</td>
            <td>
              <ul>
                <li>If M: Provide data and transition to I</li>
                <li>If E: Transition to I</li>
                <li>If S: Transition to I</li>
                <li>If I: No action</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>BusUpgr (Upgrade)</td>
            <td>Issue when writing to a block in S state</td>
            <td>
              <ul>
                <li>If S: Transition to I</li>
                <li>If I: No action</li>
              </ul>
            </td>
          </tr>
        </table>
        
        <h4>Directory-Based Protocol Implementation</h4>
        <p>In a directory-based protocol:</p>
        <ul>
          <li>A directory entry exists for each memory block, tracking which caches have copies</li>
          <li>Directory can be centralized or distributed with home nodes</li>
          <li>Each entry typically stores presence bits and state information</li>
          <li>On memory access, the directory is consulted to determine required actions</li>
          <li>Invalidation or update messages are sent only to relevant caches</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/2KXcjNb.png" alt="Directory Protocol" style="max-width: 650px; width: 100%;">
          <p><em>Example of a directory-based coherence system</em></p>
        </div>
      `
    },
    {
      id: "10.4",
      title: "Synchronization and Consistency",
      content: `
        <h3>Coordinating Access in Parallel Systems</h3>
        <p>Effective parallel programming requires proper synchronization and understanding of the memory consistency model.</p>
        
        <h4>Atomic Operations</h4>
        <p>Hardware support for atomic operations enables efficient synchronization:</p>
        <ul>
          <li><strong>Test-and-Set</strong>: Atomically tests and sets a memory location</li>
          <li><strong>Compare-and-Swap (CAS)</strong>: Updates a value only if it matches expected value</li>
          <li><strong>Load-Linked/Store-Conditional (LL/SC)</strong>: Conditionally stores only if no intervening stores</li>
          <li><strong>Fetch-and-Op</strong>: Atomically performs an operation (add, and, or, etc.)</li>
        </ul>
        
        <p>RISC-V provides atomic operations through the A (Atomic) extension:</p>
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
# RISC-V atomic operations example - Compare and Swap
# a0 = pointer to memory location
# a1 = expected value
# a2 = new value
# a0 returns 1 if successful, 0 if failed

cas:
    lr.w t0, (a0)           # Load-reserved word from address in a0
    bne t0, a1, fail        # If not expected value, fail
    sc.w a0, a2, (a0)       # Store-conditional new value
    ret                     # a0 contains success/failure (0=success, 1=failure)
fail:
    li a0, 0                # Return 0 (failure)
    ret</pre>
        
        <h4>Synchronization Primitives</h4>
        <p>Higher-level synchronization constructs built from atomic operations:</p>
        <ul>
          <li><strong>Locks/Mutexes</strong>: Ensure mutual exclusion for critical sections</li>
          <li><strong>Semaphores</strong>: Control access to a limited number of resources</li>
          <li><strong>Barriers</strong>: Synchronize threads at specific points in execution</li>
          <li><strong>Condition Variables</strong>: Allow threads to wait for specific conditions</li>
        </ul>
        
        <h4>Memory Consistency Challenges</h4>
        <p>Different memory consistency models affect how programmers must reason about parallel code:</p>
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Consistency Model</th>
            <th>Description</th>
            <th>Programming Implications</th>
          </tr>
          <tr>
            <td>Sequential Consistency</td>
            <td>All operations appear in a sequential order consistent with program order</td>
            <td>
              <ul>
                <li>More intuitive for programmers</li>
                <li>Limits hardware optimization</li>
                <li>No need for memory barriers in most cases</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Relaxed Consistency</td>
            <td>Operations may be reordered for performance (varies by architecture)</td>
            <td>
              <ul>
                <li>Better performance</li>
                <li>Requires explicit synchronization</li>
                <li>Memory barriers/fences needed to enforce ordering</li>
              </ul>
            </td>
          </tr>
        </table>
        
        <h4>RISC-V Memory Ordering</h4>
        <p>RISC-V defines a relatively relaxed memory model (RVWMO) with explicit fence instructions:</p>
        <ul>
          <li><strong>fence</strong>: General memory ordering fence</li>
          <li><strong>fence.i</strong>: Instruction fetch fence</li>
        </ul>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
# Example of using fence in RISC-V
# Thread 1:
  sw x1, 0(x2)      # Store data
  fence w, w        # Ensure all writes are visible before next write
  sw x0, 0(x3)      # Set flag

# Thread 2:
  lw x4, 0(x3)      # Check flag
  beqz x4, spin     # Loop if flag not set
  fence r, r        # Ensure subsequent reads see all prior stores
  lw x5, 0(x2)      # Read data (guaranteed to see Thread 1's store)</pre>
        
        <h4>Lock Implementation</h4>
        <p>Example of a simple spin lock implementation in RISC-V:</p>
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
# Simple spin lock implementation using RISC-V atomic instructions
# a0 = pointer to lock

acquire_lock:
    li t0, 1                # Lock value
acquire_retry:
    amoswap.w.aq t1, t0, (a0) # Atomically swap and acquire
    bnez t1, acquire_retry  # If we got non-zero, lock was held
    ret                     # Return with lock acquired

release_lock:
    amoswap.w.rl zero, zero, (a0) # Release lock with release semantics
    ret</pre>
      `
    }
  ],
  examples: [
    {
      id: "example10_1",
      title: "MESI Protocol State Transitions",
      description: "Detailed walkthrough of cache coherence protocol state transitions",
      code: `// Consider a system with two processors (P1 and P2) with private caches
// Both share a memory system with address X (initially containing value 0)

// Initial state: Both caches have X in Invalid (I) state

// Step 1: P1 reads X
// - P1's cache controller issues BusRd
// - Memory responds with data (0)
// - No other cache has a valid copy
// - P1's cache sets state to Exclusive (E)

// Cache states after Step 1:
// P1: X in E state, value = 0
// P2: X in I state

// Step 2: P1 writes value 1 to X
// - Since P1's cache has X in E state, it can transition silently to Modified (M)
// - No bus transaction required
// - Memory is now out of date

// Cache states after Step 2:
// P1: X in M state, value = 1
// P2: X in I state

// Step 3: P2 reads X
// - P2's cache controller issues BusRd
// - P1's cache sees this request and must respond since it has modified data
// - P1 provides data (1) to P2 and transitions to Shared (S) state
// - Memory is updated with the new value
// - P2's cache sets state to Shared (S)

// Cache states after Step 3:
// P1: X in S state, value = 1
// P2: X in S state, value = 1
// Memory: X = 1

// Step 4: P2 writes value 2 to X
// - P2's cache controller issues BusRdX (or BusUpgr since it has S state)
// - P1's cache sees this and invalidates its copy of X
// - P2's cache transitions to Modified (M) state

// Cache states after Step 4:
// P1: X in I state
// P2: X in M state, value = 2
// Memory: X = 1 (out of date)

// Step 5: P1 writes value 3 to X
// - P1's cache controller issues BusRdX
// - P2's cache sees this and must provide the latest data
// - P2 provides data (2) and transitions to Invalid (I)
// - P1's cache receives data, updates it to 3, and transitions to Modified (M)

// Cache states after Step 5:
// P1: X in M state, value = 3
// P2: X in I state
// Memory: X = 2 (out of date)

// This example demonstrates how the MESI protocol maintains coherence
// while minimizing bus traffic by:
// 1. Using the Exclusive state to allow silent transitions to Modified
// 2. Allowing direct cache-to-cache transfers of modified data
// 3. Ensuring only one cache can have write permission at a time
// 4. Maintaining the Single-Writer, Multiple-Reader invariant`,
      explanation: "This example walks through a sequence of operations in a two-processor system implementing the MESI cache coherence protocol. It demonstrates how the protocol handles reads and writes to ensure that all caches maintain a coherent view of memory. Key aspects illustrated include silent transitions from Exclusive to Modified states, intervention by caches with modified data, invalidation of stale copies, and the maintenance of the Single-Writer, Multiple-Reader invariant. The example shows how coherence traffic is generated only when necessary, such as when a second processor needs access to data modified by the first processor, helping to minimize the performance impact of maintaining coherence."
    },
    {
      id: "example10_2",
      title: "Implementing a Parallel Counter with Atomics",
      description: "Comparison of different approaches to implementing a thread-safe counter",
      code: `// Problem: Implement a thread-safe counter that can be incremented by multiple threads

// Method 1: Using a simple load and store (INCORRECT)
// This approach is not thread-safe and will lead to lost updates

// Thread 1              Thread 2
load r1, counter         load r1, counter
add r1, r1, 1            add r1, r1, 1
store r1, counter        store r1, counter

// If counter = 5 initially, and both threads execute interleaved:
// Thread 1 loads 5, Thread 2 loads 5,
// Both increment to 6, both store 6
// Final value is 6, not 7 as expected (lost update)

// Method 2: Using a lock/mutex
// This is correct but has overhead and potential contention

// Pseudocode:
counter_increment():
    acquire_lock(counter_lock)
    counter++
    release_lock(counter_lock)

// RISC-V implementation:
counter_increment:
    addi sp, sp, -16     # Adjust stack pointer
    sd ra, 8(sp)         # Save return address
    
    la a0, counter_lock  # Load address of lock
    call acquire_lock    # Acquire the lock
    
    la a0, counter       # Load counter address
    lw a1, 0(a0)         # Load counter value
    addi a1, a1, 1       # Increment
    sw a1, 0(a0)         # Store back
    
    la a0, counter_lock  # Load address of lock
    call release_lock    # Release the lock
    
    ld ra, 8(sp)         # Restore return address
    addi sp, sp, 16      # Restore stack pointer
    ret

// Method 3: Using atomic operations (most efficient)
// RISC-V implementation using A extension:

counter_increment:
    la a0, counter       # Load counter address
    li a1, 1             # Load increment value
    amoadd.w zero, a1, (a0) # Atomic add; old value discarded
    ret

// Alternatively, using Load-Reserved/Store-Conditional:
counter_increment:
    la a0, counter       # Load counter address
increment_retry:
    lr.w a1, (a0)        # Load-reserved
    addi a1, a1, 1       # Increment
    sc.w a2, a1, (a0)    # Store-conditional
    bnez a2, increment_retry # Retry if store failed
    ret

// Performance comparison:
// 1. Incorrect version: Fast but wrong
// 2. Lock version: Correct but has contention and overhead
// 3. Atomic version: Best combination of correctness and performance

// Scaling characteristics:
// - Lock version: Performance degrades with more threads due to contention
// - Atomic version: Still has coherence traffic but better than locks
// - For very high contention: Consider techniques like:
//   - Per-thread counters that are periodically combined
//   - Reduction trees to distribute the contention`,
      explanation: "This example compares three different approaches to implementing a shared counter that can be safely incremented by multiple threads. The first approach using simple loads and stores is incorrect and will lead to lost updates due to race conditions. The second approach using locks correctly protects the counter but introduces overhead and potential contention. The third approach using atomic operations provides the best combination of correctness and performance, especially for simple operations like increments. The example includes RISC-V implementations using both the atomic instructions from the A extension and the more portable Load-Reserved/Store-Conditional approach. It also discusses scaling characteristics, highlighting how different approaches behave as the number of threads increases and suggesting optimizations for high-contention scenarios."
    }
  ],
  quiz: {
    title: "Multiprocessor Systems and Cache Coherence Quiz",
    questions: [
      {
        question: "What is the primary reason cache coherence is needed in multiprocessor systems?",
        options: [
          "To reduce the total number of memory accesses",
          "To maintain a consistent view of memory across multiple caches",
          "To improve the performance of single-threaded applications",
          "To eliminate the need for virtual memory"
        ],
        correctAnswer: 1,
        explanation: "Cache coherence is needed to maintain a consistent view of memory across multiple caches. Without coherence, different processors might see different values for the same memory location due to local caching, leading to incorrect program behavior. Coherence protocols ensure that when one processor modifies a cached value, other processors will see that update."
      },
      {
        question: "Which approach to multiprocessor architecture has memory access times that vary depending on the location of memory relative to the processor?",
        options: [
          "Symmetric Multiprocessing (SMP)",
          "Uniform Memory Access (UMA)",
          "Non-Uniform Memory Access (NUMA)",
          "Distributed Memory Systems"
        ],
        correctAnswer: 2,
        explanation: "Non-Uniform Memory Access (NUMA) architectures have varying memory access times depending on the location of memory relative to the processor. In NUMA systems, each processor has local memory that it can access quickly, while accessing memory attached to other processors takes longer. This is in contrast to UMA systems like basic SMP, where all memory accesses take the same time from any processor."
      },
      {
        question: "In the MESI cache coherence protocol, what does the 'E' state represent?",
        options: [
          "Enabled - the cache line is enabled for writing",
          "Error - the cache line contains corrupt data",
          "Exclusive - the cache line is only in this cache and is unmodified",
          "Extended - the cache line has been extended with additional metadata"
        ],
        correctAnswer: 2,
        explanation: "In the MESI protocol, the 'E' state stands for Exclusive, meaning the cache line exists only in this cache (no other cache has a copy) and is unmodified (matches memory). The exclusive state is an optimization that allows a processor to modify a cache line without generating coherence traffic if it's the only one with a copy. It can transition silently to the Modified state on a write."
      },
      {
        question: "What is the key difference between snooping-based and directory-based cache coherence protocols?",
        options: [
          "Snooping protocols are only used in distributed memory systems",
          "Directory protocols require specialized hardware that snooping protocols don't need",
          "Snooping protocols broadcast coherence messages, while directory protocols send targeted messages",
          "Directory protocols cannot support write-back caches"
        ],
        correctAnswer: 2,
        explanation: "The key difference is that snooping protocols broadcast coherence messages to all caches (via a shared bus or interconnect that all caches monitor), while directory protocols use a directory structure to track which caches have copies of each block and send targeted messages only to relevant caches. This makes directory protocols more scalable for larger systems by reducing coherence traffic, though they have higher implementation complexity and latency per coherence operation."
      },
      {
        question: "What coherence problem can occur when two processors share a variable without proper synchronization?",
        options: [
          "Memory leakage",
          "Stack overflow",
          "Lost updates",
          "Heap fragmentation"
        ],
        correctAnswer: 2,
        explanation: "Lost updates can occur when two processors share a variable without proper synchronization. For example, if two processors try to increment a shared counter by reading, incrementing, and writing back the value, one of the updates may be lost if the second processor reads the value before the first processor's write becomes visible. This is why atomic operations or proper synchronization primitives are needed for correct concurrent access to shared data."
      },
      {
        question: "What is false sharing in the context of cache coherence?",
        options: [
          "When a processor claims to have data it doesn't actually have",
          "When two processors access different variables that happen to be in the same cache line",
          "When coherence protocol messages are dropped due to network errors",
          "When a processor incorrectly shares private data with other processors"
        ],
        correctAnswer: 1,
        explanation: "False sharing occurs when two or more processors access different variables that happen to be located in the same cache line. Although the processors are not accessing the same data (not truly sharing), the coherence protocol operates at the granularity of cache lines, causing coherence traffic and performance degradation as the cache line 'ping-pongs' between processors. This is a common performance issue in parallel programs that can be mitigated by careful data layout."
      },
      {
        question: "Which RISC-V instructions provide atomic memory operations?",
        options: [
          "The C extension (compressed instructions)",
          "The M extension (integer multiplication and division)",
          "The A extension (atomic instructions)",
          "The F extension (single-precision floating point)"
        ],
        correctAnswer: 2,
        explanation: "The A extension in RISC-V provides atomic memory operations. This extension includes instructions for atomic load-and-operate operations like atomic add, swap, and compare-and-swap, as well as load-reserved/store-conditional (LR/SC) instructions. These atomic operations are essential for implementing synchronization primitives and concurrent data structures in multiprocessor systems."
      },
      {
        question: "What is the primary advantage of using directory-based cache coherence over snooping-based coherence?",
        options: [
          "Lower implementation complexity",
          "Faster coherence operations",
          "Better scalability to larger numbers of processors",
          "Support for more complex consistency models"
        ],
        correctAnswer: 2,
        explanation: "The primary advantage of directory-based cache coherence over snooping-based coherence is better scalability to larger numbers of processors. Snooping protocols require broadcasting messages to all caches, which creates bandwidth bottlenecks as the system scales. Directory protocols send targeted messages only to relevant caches by tracking which caches have copies of each block, significantly reducing coherence traffic in large systems."
      },
      {
        question: "What is memory consistency in the context of multiprocessor systems?",
        options: [
          "The property that ensures memory is consistently allocated and deallocated",
          "The property that ensures all processors have the same amount of cache",
          "The property that defines the order in which memory operations from different processors appear to execute",
          "The property that ensures all memory is error-checked before use"
        ],
        correctAnswer: 2,
        explanation: "Memory consistency defines the order in which memory operations from different processors appear to execute in a multiprocessor system. It specifies what values can be legally returned by read operations based on the ordering of previous read and write operations from all processors. Different architectures implement different memory consistency models, ranging from strict sequential consistency to various relaxed models that allow more reordering for better performance."
      },
      {
        question: "Which of the following is a key challenge in the design of chip multiprocessors (CMPs) compared to traditional multiprocessor systems?",
        options: [
          "Integrating the memory controller on the same chip",
          "Managing thermal constraints and power consumption",
          "Supporting virtual memory",
          "Running multiple operating systems"
        ],
        correctAnswer: 1,
        explanation: "Managing thermal constraints and power consumption is a key challenge in the design of chip multiprocessors (CMPs). With multiple cores integrated on a single chip, heat generation and power consumption become critical limiting factors. CMP designs must carefully balance performance against these constraints, often incorporating sophisticated power management features and heterogeneous core designs. This is less of an issue in traditional multiprocessor systems where processors are physically separated."
      }
    ]
  }
};

export default chapter10; 