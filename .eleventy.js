import { renderTodoItem } from './src/_includes/components/todo-item.ts'

export default function(eleventyConfig) {
  eleventyConfig.addShortcode('todoItem', (text, checked) =>
    renderTodoItem({ text, checked: checked !== 'false' && !!checked })
  )

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
    },
    templateFormats: ['html', 'njk'],
  }
}
