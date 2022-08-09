namespace Sample
{
public class BTNode
    {
        public int Data;
        public BTNode? Left;
        public BTNode? Right;

        public BTNode(int data = 0, BTNode? left = null, BTNode? right = null)
        {
            Data = data;
            Left = left;
            Right = right;
        }
    }
}