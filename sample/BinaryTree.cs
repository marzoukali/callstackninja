namespace Sample
{
    public class BinaryTree
    {
        public BTNode? Root { get; set; }

        public void Create()
        {
            BTNode p, t;
            int parsedValue;
            var queue = new Queue<BTNode>();

            Console.WriteLine("Enter a root node");
            parsedValue = Convert.ToInt32(Console.ReadLine());
            Root = new BTNode(parsedValue);
            Root.Left = Root.Right = null;
            queue.Enqueue(Root);

            while (queue.Count > 0)
            {
                p = queue.Dequeue();
                Console.WriteLine($"Enter the left child of {p.Data}");
                parsedValue = Convert.ToInt32(Console.ReadLine());

                if (parsedValue != -1)
                {
                    t = new BTNode(parsedValue);
                    t.Left = t.Right = null;
                    p.Left = t;
                    queue.Enqueue(t);
                }

                Console.WriteLine($"Enter the right child of {p.Data}");
                parsedValue = Convert.ToInt32(Console.ReadLine());

                if (parsedValue != -1)
                {
                    t = new BTNode(parsedValue);
                    t.Left = t.Right = null;
                    p.Right = t;
                    queue.Enqueue(t);
                }

            }

        }

        public void PreOrder(BTNode? node)
        {
            if (node != null)
            {
                Console.Write($"{node.Data} ");
                PreOrder(node.Left);
                PreOrder(node.Right);
            }
        }


        public void PreOrderIterative(BTNode? node)
        {
            var stack = new Stack<BTNode?>();

            while (node != null || stack.Count > 0)
            {
                if (node != null)
                {
                    Console.Write($"{node.Data} ");
                    stack.Push(node);
                    node = node.Left;
                }
                else
                {
                    node = stack.Pop();
                    node = node.Right;
                }
            }
        }


        public void PreOrderIterative2(BTNode? node)
        {
            var stack = new Stack<BTNode?>();

            if (node != null) stack.Push(node);

            while (stack.Any())
            {
                var tmp = stack.Pop();
                Console.Write($"{tmp.Data} ");
                if (tmp.Right != null) stack.Push(tmp.Right);
                if (tmp.Left != null) stack.Push(tmp.Left);
            }
        }



        public void InOrderIterative(BTNode? node)
        {
            var stack = new Stack<BTNode?>();

            while (node != null || stack.Count > 0)
            {
                if (node != null)
                {
                    stack.Push(node);
                    node = node.Left;
                }
                else
                {
                    node = stack.Pop();
                    Console.Write($"{node.Data} ");
                    node = node.Right;
                }
            }
        }



        public void InOrderIterative2(BTNode? node)
        {
            var stack = new Stack<BTNode?>();

            if (node != null) stack.Push(node);

            while (stack.Any())
            {
                var tmp = stack.Pop();
                Console.Write($"{tmp.Data} ");
                if (tmp.Left != null) stack.Push(tmp.Left);
                if (tmp.Right != null) stack.Push(tmp.Right);
            }
        }


        public void InOrder(BTNode? node)
        {
            if (node != null)
            {
                InOrder(node.Left);
                Console.Write($"{node.Data} ");
                InOrder(node.Right);
            }
        }


        public void PostOrder(BTNode? node)
        {
            if (node != null)
            {
                PostOrder(node.Left);
                PostOrder(node.Right);
                Console.Write($"{node.Data} ");
            }
        }


        public void PostOrderIterative(BTNode? node)
        {
            var stack = new Stack<BTNode>();

            while (node != null || stack.Count > 0)
            {
                if (node != null)
                {
                    stack.Push(node);
                    node = node.Left;
                }
                else
                {
                    var tmp = stack.Pop();
                    if (tmp.Data > 0)
                    {
                        tmp.Data = -tmp.Data;
                        stack.Push(tmp);
                        node = tmp.Right;
                    }
                    else
                    {
                        Console.Write($"{-tmp.Data} ");
                    }
                }
            }
        }




        //        std::stack<Node*> leftStack;
        //        std::stack<Node*> rightStack;

        //        Node* currentNode = m_root;
        //while( !leftStack.empty() || currentNode != NULL )
        //{
        //    if(currentNode )
        //    {
        //        leftStack.push(currentNode );
        //        currentNode = currentNode->m_left;
        //    }
        //    else
        //    {
        //        currentNode = leftStack.top();
        //        leftStack.pop();

        //        rightStack.push(currentNode );
        //        currentNode = currentNode->m_right;
        //    }
        //}

        //while (!rightStack.empty())
        //{
        //    currentNode = rightStack.top();
        //    rightStack.pop();

        //    std::cout << currentNode->m_value;
        //    std::cout << "\n";
        //}


        public void PostOrderIterative2(BTNode? node)
        {
            var stack = new Stack<BTNode?>();
            Stack<int> outStack = new Stack<int>();

            if (node != null) stack.Push(node);

            while (stack.Count > 0)
            {
                var tmp = stack.Pop();
                outStack.Push(tmp.Data);
                if (tmp.Left != null) stack.Push(tmp.Left);
                if (tmp.Right != null) stack.Push(tmp.Right);
            }


            while (outStack.Any())
            {
                Console.Write($"{outStack.Pop()} ");
            }
        }


        public void PostOrderIterative3(BTNode? node)
        {

        }


        public void LevelOrder(BTNode node)
        {
            var queue = new Queue<BTNode?>();
            Console.Write($"{node.Data} ");
            queue.Enqueue(node);

            while (queue.Count > 0)
            {
                var current = queue.Dequeue();

                if (current.Left != null)
                {
                    Console.Write($"{current.Left.Data} ");
                    queue.Enqueue(current.Left);
                }


                if (current.Right != null)
                {
                    Console.Write($"{current.Right.Data} ");
                    queue.Enqueue(current.Right);
                }
            }

        }

        public int HeightPostOrder(BTNode? node)
        {
            if (node == null)
            {
                return 0;
            }

            var x = HeightPostOrder(node.Left);
            var y = HeightPostOrder(node.Right);
            return x > y ? x + 1 : y + 1;
        }


        public int CountPostOrder(BTNode? node)
        {
            if (node == null)
            {
                return 0;
            }

            var x = CountPostOrder(node.Left);
            var y = CountPostOrder(node.Right);
            return x + y + 1;
        }

        public int SumPostOrder(BTNode? node)
        {
            if (node == null)
            {
                return 0;
            }

            var x = SumPostOrder(node.Left);
            var y = SumPostOrder(node.Right);
            return x + y + node.Data;
        }


        public int CountDegreeTwoPostOrder(BTNode? node)
        {
            if (node == null)
            {
                return 0;
            }

            var x = CountDegreeTwoPostOrder(node.Left);
            var y = CountDegreeTwoPostOrder(node.Right);
            
            if(node.Left != null && node.Right != null)
            {
                return x + y + 1;
            }
            else
            {
                return x + y;
            }
        }


        public int CountDegreeOneAndTwoPostOrder(BTNode? node)
        {
            if (node == null)
            {
                return 0;
            }

            var x = CountDegreeOneAndTwoPostOrder(node.Left);
            var y = CountDegreeOneAndTwoPostOrder(node.Right);

            if (node.Left != null || node.Right != null)
            {
                return x + y + 1;
            }
            else
            {
                return x + y;
            }
        }


        public int CounLeafNodesPostOrder(BTNode? node)
        {
            if (node == null)
            {
                return 0;
            }

            var x = CounLeafNodesPostOrder(node.Left);
            var y = CounLeafNodesPostOrder(node.Right);

            if (node.Left == null && node.Right == null)
            {
                return x + y + 1;
            }
            else
            {
                return x + y;
            }
        }


        public int CountDegreeOnePostOrder(BTNode? node)
        {
            if (node == null)
            {
                return 0;
            }

            var x = CountDegreeOnePostOrder(node.Left);
            var y = CountDegreeOnePostOrder(node.Right);

            if (
                // (node.Left != null && node.Right == null)  || (node.Left == null && node.Right != null)
                node.Left != null ^ node.Right != null // (exclusive or > LR`+L`R == L exclusive or R == node.Left != null ^ node.Right != null)
                )
            {
                return x + y + 1;
            }
            else
            {
                return x + y;
            }
        }

        public BTNode? BuildTree(int[] preorder, int[] inorder)
        {
            return BuildTreeHelper(0, 0, inorder.Length - 1, preorder, inorder);
        }

        public BTNode? BuildTreeHelper(int preStart, int inStart, int inEnd, int[] preorder, int[] inorder)
        {
            if (preStart > preorder.Length - 1 || inStart > inEnd)
            {
                return null;
            }

            var root = new BTNode(preorder[preStart]);
            var inIndex = -1;

            // Can be improved using map to O(1) and overall O(n)
            for (int i = inStart; i <= inEnd; i++)
            {
                if (inorder[i] == root.Data)
                {
                    inIndex = i;
                }
            }


            root.Left = BuildTreeHelper(preStart + 1, inStart, inIndex - 1, preorder, inorder);
            root.Right = BuildTreeHelper(preStart + inIndex - inStart + 1, inIndex + 1, inEnd, preorder, inorder);
            return root;
        }



    }
}
