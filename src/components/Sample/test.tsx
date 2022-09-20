import { Sample } from '~/components/Sample'
import { render } from '@testing-library/react'

describe('<Sample />', () => {
  test('render test', () => {
    const { getAllByText } = render(<Sample />)
    expect(getAllByText('sample')).toBeTruthy()
  })
})
